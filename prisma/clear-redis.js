const Redis = require("ioredis");
require("dotenv").config();

async function clearRedisData() {
  if (!process.env.REDIS_URL) {
    console.log("Redis URL not found in environment. Skipping Redis cleanup.");
    return;
  }

  console.log("Connecting to Redis...");
  const redis = new Redis(process.env.REDIS_URL);

  try {
    // Clear all session data
    console.log("Finding session keys...");
    const sessionKeys = await redis.keys("user:*:session");

    if (sessionKeys.length > 0) {
      console.log(`Found ${sessionKeys.length} session keys to delete.`);
      await redis.del(...sessionKeys);
      console.log("Redis session data cleared successfully.");
    } else {
      console.log("No session keys found in Redis.");
    }
  } catch (error) {
    console.error("Error clearing Redis data:", error);
  } finally {
    // Close Redis connection
    await redis.quit();
    console.log("Redis connection closed.");
  }
}

clearRedisData();
