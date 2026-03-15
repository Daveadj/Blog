import { createClient } from "redis";
import { AppLogger } from "../utils/logger.interface";

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
    url: redisUrl
});

let appLogger: AppLogger | null = null;

export const configureRedisLogger = (logger: AppLogger): void => {
  appLogger = logger;
};
    

redisClient.on("error", (err) => {
  appLogger?.error("Redis error", { message: err.message, stack: err.stack });
});

redisClient.on("connect", () => {
 appLogger?.info("Redis connected");
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export default redisClient;