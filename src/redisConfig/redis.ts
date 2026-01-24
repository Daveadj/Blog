import { createClient } from "redis";
import { BadRequestException } from "../exceptions/exceptions";

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
    url: redisUrl
});
    

redisClient.on("error", (err) => {
  console.error("❌ Redis error: " + err.message);
});

redisClient.on("connect", () => {
 console.log("✅ Redis connected");
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export default redisClient;