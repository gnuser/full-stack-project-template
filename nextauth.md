# 1. Install Required Dependencies

```shell
# Install NextAuth and Redis adapter
bun add next-auth @auth/core @auth/prisma-adapter
bun add @upstash/redis @upstash/ratelimit

# Install types
bun add -d @types/next-auth
```

# 2. Configure Redis

```shell
# Install Redis server (macOS)
brew install redis
brew services start redis

# Or use Docker
docker run -d -p 6379:6379 --name redis redis:alpine
```

# 3. Configure NextAuth

```shell
# Create a new NextAuth configuration file
touch auth.ts
```

Add this content to your `auth.ts` file:

```typescript
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Redis } from "@upstash/redis";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    // Add your authentication providers here
    // Example:
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user data to session
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // Store session in Redis for faster lookups
      await redis.set(`user:${user.id}:session`, true, {
        ex: 30 * 24 * 60 * 60, // 30 days
      });
    },
    async signOut({ token }) {
      if (token.sub) {
        await redis.del(`user:${token.sub}:session`);
      }
    },
  },
  pages: {
    signIn: "/login",
    // Add more custom pages if needed
  },
};
```

# 4. Update Environment Variables

Add the following to your `.env` file:

```
# NextAuth with Redis
# For Upstash Redis (production)
UPSTASH_REDIS_REST_URL=https://your-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# For local Redis (development)
REDIS_URL=redis://localhost:6379

# NextAuth Config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-at-least-32-chars

# Generate a secret with: openssl rand -base64 32
```

# 5. Update Prisma Schema

Add the following models to your `prisma/schema.prisma` file:

```prisma
// NextAuth Models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

# 6. Create Prisma Client

Create a file at `lib/prisma.ts`:

```shell
mkdir -p lib
touch lib/prisma.ts
```

Add this content:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

# 7. Create NextAuth API Route

Create a Next.js API route for NextAuth:

```shell
mkdir -p app/api/auth/[...nextauth]
touch app/api/auth/[...nextauth]/route.ts
```

Add this content:

```typescript
import NextAuth from "next-auth";
import { authOptions } from "@/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

# 8. Create Login Page

Create a login page at `app/login/page.tsx`:

```shell
mkdir -p app/login
touch app/login/page.tsx
```

Add this content:

```typescript
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-md">
        <h1 className="text-2xl font-bold">Sign In</h1>
        {/* Add your sign-in form or provider buttons here */}
      </div>
    </div>
  );
}
```

# 9. Update Database Schema

Apply the Prisma schema changes:

```shell
bunx prisma migrate dev --name add_auth_tables
```

# 10. Usage Examples

## Server Component Example

```typescript
// Example for server component
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Handle not authenticated
    return <div>Please log in</div>;
  }

  return <div>Welcome, {session.user?.name}</div>;
}
```

## Client Component Example

```typescript
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="rounded bg-red-500 px-4 py-2 text-white"
      >
        Sign out
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="rounded bg-blue-500 px-4 py-2 text-white"
    >
      Sign in
    </button>
  );
}
```

# 11. SessionProvider Setup

Add a SessionProvider to your root layout:

```typescript
// app/layout.tsx
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
```

Note: You'll need to create a client component wrapper for SessionProvider since it's a client component and can't be directly used in server components.
