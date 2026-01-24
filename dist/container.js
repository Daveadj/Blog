"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const PostRepository_1 = require("./repository/implementation/PostRepository");
const PostService_1 = require("./service/PostService");
const redisCache_1 = require("./redisConfig/redisCache");
const postRepository = new PostRepository_1.PostRepository();
const redisCache = new redisCache_1.RedisCache(postRepository);
const postService = new PostService_1.PostService(redisCache);
exports.container = {
    postRepository,
    postService,
    redisCache
};
