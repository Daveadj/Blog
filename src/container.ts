import { PostRepository } from "./repository/implementation/PostRepository";
import { IPostService, PostService } from "./service/PostService";
import { IPostRepository } from "./repository/interfaces/IPostRepository";
import { RedisCache } from "./redisConfig/redisCache";
import { logger } from "./utils/logger";
import { createPostController } from "./controllers/postController";
import { createCustomExceptionHandler } from "./exceptions/customExceptionHandler";
import { AppLogger } from "./utils/logger.interface";

const postRepository : IPostRepository = new PostRepository();
const redisCache : RedisCache = new RedisCache(postRepository);
const postService : IPostService = new PostService(redisCache);
const appLogger: AppLogger = logger;
const postController = createPostController(postService, appLogger);
const customExceptionHandler = createCustomExceptionHandler(appLogger);

export const container = {
    logger: appLogger,
    postRepository,
    postService,
    redisCache,
    postController,
    customExceptionHandler
};