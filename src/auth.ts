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

// Optimize Redis connection and error handling
// Create a type representing a minimal Redis-like interface
interface RedisLike {
  set: (...args: any[]) => any;
  get: (...args: any[]) => any;
  del: (...args: any[]) => any;
}

// Initialize Redis client with retry mechanism
let redis: RedisLike;
let redisConnectionAttempts = 0;
const MAX_REDIS_CONNECTION_ATTEMPTS = 3;

// Function to initialize Redis client with retry logic - extracted to function
// to avoid duplicate code and optimize connection management
const initializeRedis = () => {
  try {
    redisConnectionAttempts++;

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
      // Use ioredis for local development with event handlers
      const client = new Redis(process.env.REDIS_URL);

      client.on("error", (err) => {
        console.error("Redis connection error:", err);

        // If we haven't exceeded max attempts, try to reconnect
        if (redisConnectionAttempts < MAX_REDIS_CONNECTION_ATTEMPTS) {
          console.log(
            `Attempting to reconnect to Redis (attempt ${redisConnectionAttempts} of ${MAX_REDIS_CONNECTION_ATTEMPTS})...`
          );
          setTimeout(initializeRedis, 2000); // Wait 2 seconds before retrying
        } else {
          console.error(
            `Failed to connect to Redis after ${MAX_REDIS_CONNECTION_ATTEMPTS} attempts.`
          );
        }
      });

      client.on("connect", () => {
        console.log("Successfully connected to Redis");
        redisConnectionAttempts = 0; // Reset the counter on successful connection
      });

      redis = client;
      console.log("Using local Redis with ioredis");
    } else {
      // If no Redis URL is provided, use a mock implementation
      redis = {
        set: async (...args: any[]) => true,
        get: async (...args: any[]) => null,
        del: async (...args: any[]) => true,
      };
      console.log("Using mock Redis implementation");
    }

    return redis;
  } catch (error) {
    console.error("Error initializing Redis:", error);

    // If we haven't exceeded max attempts, try to reconnect
    if (redisConnectionAttempts < MAX_REDIS_CONNECTION_ATTEMPTS) {
      console.log(
        `Attempting to reconnect to Redis (attempt ${redisConnectionAttempts} of ${MAX_REDIS_CONNECTION_ATTEMPTS})...`
      );
      setTimeout(initializeRedis, 2000); // Wait 2 seconds before retrying
    } else {
      console.error(
        `Failed to connect to Redis after ${MAX_REDIS_CONNECTION_ATTEMPTS} attempts.`
      );
    }

    // Return a mock implementation in case of error
    return {
      set: async (...args: any[]) => true,
      get: async (...args: any[]) => null,
      del: async (...args: any[]) => true,
    };
  }
};

// Initialize Redis connection
initializeRedis();

// Use a more strongly typed authOptions configuration
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            return null;
          }

          const isValidPassword = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            return null;
          }

          // Return user without password for security
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
    async jwt({ token, user, account }) {
      // Add user ID to the token when it's first created
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data to session from token
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
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
    error: "/login?error=true",
    // Add more custom pages if needed
  },
};
