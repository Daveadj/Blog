import { IPostRepository } from "../repository/interfaces/IPostRepository";
import { CreatePostDto, PostResponseDto, UpdatePostDto } from "../Dtos/post.dto";
import { Post } from "../models/post";
import { NotFoundException } from "../exceptions/exceptions";

export interface IPostService {
    createPost(data: CreatePostDto): Promise<PostResponseDto>;
    findAll(): Promise<PostResponseDto[]>;
    findById(id: number): Promise<PostResponseDto | null>;
    update(id: number, data: UpdatePostDto): Promise<PostResponseDto | null>;
    delete(id: number): Promise<void>;
}






export class PostService implements IPostService {
    private readonly repo: IPostRepository;
    constructor(repo: IPostRepository) {
      this.repo = repo;
    }

    async createPost(data: CreatePostDto): Promise<PostResponseDto> {
        const post = await this.repo.create(data);
        return this.toResponseDto(post);
    }

    async findAll(): Promise<PostResponseDto[]> {
        const posts = await this.repo.findAll();
        return posts.map((post) => this.toResponseDto(post));
    }

    async findById(id: number): Promise<PostResponseDto | null> {
        const post = await this.repo.findById(id);
            if (post === null) {
      throw new NotFoundException('Post not found', ['Post not found']);
    }
        return post ? this.toResponseDto(post) : null;
    }

    async update(id: number, data: UpdatePostDto): Promise<PostResponseDto | null> {
        const post = await this.repo.update(id, data);
        return post ? this.toResponseDto(post) : null;
    }

    async delete(id: number): Promise<void> {
      await this.repo.delete(id);
    }

     private toResponseDto(post: Post): PostResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt ?? post.createdAt,
    };
    }
}