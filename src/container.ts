import { PostRepository } from "./repository/implementation/PostRepository";
import { IPostService, PostService } from "./service/PostService";
import { IPostRepository } from "./repository/interfaces/IPostRepository";
import { RedisCache } from "./redisConfig/redisCache";

import { createPostController } from "./controllers/postController";
import { createCustomExceptionHandler } from "./exceptions/customExceptionHandler";
import { AppLogger } from "./utils/logger.interface";
import { createLogger } from "./utils/logger";

export async function createContainer() {
  const postRepository: IPostRepository = new PostRepository();
  const redisCache: RedisCache = new RedisCache(postRepository);
  const postService: IPostService = new PostService(redisCache);

  const appLogger: AppLogger = await createLogger();

  const postController = createPostController(postService, appLogger);
  const customExceptionHandler = createCustomExceptionHandler(appLogger);

  return {
    logger: appLogger,
    postRepository,
    postService,
    redisCache,
    postController,
    customExceptionHandler
  };
}