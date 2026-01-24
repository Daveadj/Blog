import { BlogParams } from "../Dtos/blogParams";
import { CreatePostDto, UpdatePostDto } from "../Dtos/post.dto";
import { Post } from "../models/post";
import { IPostRepository } from "../repository/interfaces/IPostRepository";
import crypto from "crypto";
import { deleteCache, getCache, setCache } from "../utils/cachehelper";

export class RedisCache implements IPostRepository{
private readonly IPostRepository: IPostRepository;

    constructor(IPostRepository: IPostRepository) {
        this.IPostRepository = IPostRepository;
    }



    async create(data: CreatePostDto): Promise<Post> {
        const post = await this.IPostRepository.create(data);
        await deleteCache("posts"); 
        return post;
    }
    
    async findAll(params: BlogParams): Promise<{ items: Post[]; totalCount: number; }> {
        const key = this.postsKey(params);

        const cached = await getCache<{ items: Post[]; totalCount: number }>(key);
        if (cached) return cached;

        const result = await this.IPostRepository.findAll(params);

        await setCache(key, result, 300);

        return result;
    }

    
    async findById(id: number): Promise<Post | null> {
        const key = this.postKey(id);

        const cached = await getCache<Post>(key);
        if (cached) return cached;

        const post = await this.IPostRepository.findById(id);

        if (post) {
        await setCache(key, post, 600);
    }

    return post;
    }
    async update(id: number, data: UpdatePostDto): Promise<Post | null> {
         const post = await this.IPostRepository.update(id, data);

        if (post) {
        await deleteCache(this.postKey(id));
        await deleteCache("posts");
    }

        return post;
    }
    async delete(id: number): Promise<Post | null> {
      const post = await this.IPostRepository.delete(id);

        await deleteCache(this.postKey(id));
        await deleteCache("posts");

        return post;
    }


      private postKey(id: number): string {
        return `post:${id}`;
    }

  private postsKey(params: BlogParams): string {
    const hash = crypto
      .createHash("md5")
      .update(JSON.stringify(params))
      .digest("hex");

    return `posts:${hash}`;
  }

}