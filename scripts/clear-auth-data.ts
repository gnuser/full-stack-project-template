import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

async function clearAuthData() {
  console.log("Starting to clear authentication data...");

  // Initialize Prisma client
  const prisma = new PrismaClient();

  try {
    // Clear all auth tables in appropriate order (respecting foreign key constraints)
    console.log("Clearing Account table...");
    await prisma.account.deleteMany();

    console.log("Clearing Session table...");
    await prisma.session.deleteMany();

    console.log("Clearing VerificationToken table...");
    await prisma.verificationToken.deleteMany();

    console.log("Clearing User table...");
    await prisma.user.deleteMany();

    console.log("Database authentication data cleared successfully");

    // Clear Redis session data if Redis is configured
    if (process.env.REDIS_URL) {
      console.log("Clearing Redis session data...");
      const redis = new Redis(process.env.REDIS_URL);

      // Get all user session keys
      const sessionKeys = await redis.keys("user:*:session");

      if (sessionKeys.length > 0) {
        // Delete all session keys
        await redis.del(...sessionKeys);
        console.log(`Cleared ${sessionKeys.length} Redis session keys`);
      } else {
        console.log("No Redis session keys found");
      }

      // Close Redis connection
      await redis.quit();
    } else {
      console.log("Redis not configured, skipping Redis cleanup");
    }
  } catch (error) {
    console.error("Error clearing authentication data:", error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
    console.log("Finished clearing authentication data");
  }
}

// Run the function
clearAuthData();
