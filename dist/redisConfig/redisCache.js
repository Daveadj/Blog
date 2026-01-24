"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCache = void 0;
const crypto_1 = __importDefault(require("crypto"));
const cachehelper_1 = require("../utils/cachehelper");
class RedisCache {
    constructor(IPostRepository) {
        this.IPostRepository = IPostRepository;
    }
    async create(data) {
        const post = await this.IPostRepository.create(data);
        await (0, cachehelper_1.deleteCache)("posts");
        return post;
    }
    async findAll(params) {
        const key = this.postsKey(params);
        const cached = await (0, cachehelper_1.getCache)(key);
        if (cached)
            return cached;
        const result = await this.IPostRepository.findAll(params);
        await (0, cachehelper_1.setCache)(key, result, 300);
        return result;
    }
    async findById(id) {
        const key = this.postKey(id);
        const cached = await (0, cachehelper_1.getCache)(key);
        if (cached)
            return cached;
        const post = await this.IPostRepository.findById(id);
        if (post) {
            await (0, cachehelper_1.setCache)(key, post, 600);
        }
        return post;
    }
    async update(id, data) {
        const post = await this.IPostRepository.update(id, data);
        if (post) {
            await (0, cachehelper_1.deleteCache)(this.postKey(id));
            await (0, cachehelper_1.deleteCache)("posts");
        }
        return post;
    }
    async delete(id) {
        const post = await this.IPostRepository.delete(id);
        await (0, cachehelper_1.deleteCache)(this.postKey(id));
        await (0, cachehelper_1.deleteCache)("posts");
        return post;
    }
    postKey(id) {
        return `post:${id}`;
    }
    postsKey(params) {
        const hash = crypto_1.default
            .createHash("md5")
            .update(JSON.stringify(params))
            .digest("hex");
        return `posts:${hash}`;
    }
}
exports.RedisCache = RedisCache;
