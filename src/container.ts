import { PostRepository } from "./repository/implementation/PostRepository";
import { IPostService, PostService } from "./service/PostService";
import { IPostRepository } from "./repository/interfaces/IPostRepository";
import { RedisCache } from "./redisConfig/redisCache";

const postRepository : IPostRepository = new PostRepository();
const redisCache : RedisCache = new RedisCache(postRepository);
const postService : IPostService = new PostService(redisCache);
export const container = {
    postRepository,
    postService,
    redisCache
};