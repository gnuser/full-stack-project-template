// import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Redis as UpstashRedis } from "@upstash/redis";
import Redis from "ioredis";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";

// Create a type representing a minimal Redis-like interface
interface RedisLike {
  set: (...args: any[]) => any;
  get: (...args: any[]) => any;
  del: (...args: any[]) => any;
}

// Initialize Redis client
let redis: RedisLike;

// Check if we're using Upstash (production) or local Redis (development)
if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  // Use Upstash Redis client for production
  redis = new UpstashRedis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  console.log("Using Upstash Redis");
} else if (process.env.REDIS_URL) {
  // Use ioredis for local development
  redis = new Redis(process.env.REDIS_URL);
  console.log("Using local Redis with ioredis");
} else {
  // Fallback to a mock Redis implementation
  console.log("No Redis configuration found, using mock implementation");
  redis = {
    set: async () => true,
    get: async () => null,
    del: async () => true,
  };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // If no user or password doesn't match
          if (!user || !user.password) {
            return null;
          }

          // Verify password
          const isValid = verifyPassword(credentials.password, user.password);

          if (!isValid) {
            return null;
          }

          // Return user without password
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user data to session
      if (session.user) {
        session.user = {
          ...session.user,
          id: user.id,
        } as {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
          id: string;
        };
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // Store session in Redis for faster lookups
      try {
        if (redis instanceof Redis) {
          // Local Redis using ioredis - use correct string format
          await redis.set(
            `user:${user.id}:session`,
            "1",
            "EX",
            30 * 24 * 60 * 60
          );
        } else {
          // Upstash Redis
          await redis.set(`user:${user.id}:session`, true, {
            ex: 30 * 24 * 60 * 60, // 30 days
          });
        }
      } catch (error) {
        console.error("Redis signIn error:", error);
        // Don't throw the error, as we don't want to break the auth flow
      }
    },
    async signOut({ token }) {
      if (token.sub) {
        try {
          await redis.del(`user:${token.sub}:session`);
        } catch (error) {
          console.error("Redis signOut error:", error);
        }
      }
    },
  },
  pages: {
    signIn: "/login",
    // Add more custom pages if needed
  },
};
