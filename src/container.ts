import { PostRepository } from "./repository/implementation/PostRepository";
import { IPostService, PostService } from "./service/PostService";
import { IPostRepository } from "./repository/interfaces/IPostRepository";

const postRepository : IPostRepository = new PostRepository();
const postService : IPostService = new PostService(postRepository);
export const container = {
    postRepository,
    postService
};