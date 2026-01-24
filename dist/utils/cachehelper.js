"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = getCache;
exports.setCache = setCache;
exports.deleteCache = deleteCache;
const redis_1 = __importDefault(require("../redisConfig/redis"));
async function getCache(key) {
    const value = await redis_1.default.get(key);
    if (!value)
        return null;
    return JSON.parse(value);
}
/* Save to cache */
async function setCache(key, data, ttlSeconds = 300) {
    await redis_1.default.set(key, JSON.stringify(data), { EX: ttlSeconds });
}
/* Remove from cache */
async function deleteCache(key) {
    await redis_1.default.del(key);
}
