"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = void 0;
const redis_1 = require("redis");
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = (0, redis_1.createClient)({
    url: redisUrl
});
redisClient.on("error", (err) => {
    console.error("❌ Redis error: " + err.message);
});
redisClient.on("connect", () => {
    console.log("✅ Redis connected");
});
const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};
exports.connectRedis = connectRedis;
exports.default = redisClient;
