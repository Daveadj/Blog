import { IPostRepository } from "../repository/interfaces/IPostRepository";
import { CreatePostDto, PostResponseDto, UpdatePostDto } from "../Dtos/post.dto";
import { Post } from "../models/post";
import { NotFoundException } from "../exceptions/exceptions";
import { GenericResponse, ResponseHelper } from "../utils/genericResponse";
import { BlogParams } from "../Dtos/blogParams";
import { PaginatedResponse, PaginatedResponseHelper, PaginationInfo } from "../utils/paginatedResponse";
import { RedisCache } from "../redisConfig/redisCache";

export interface IPostService {
    createPost(data: CreatePostDto): Promise<GenericResponse<PostResponseDto>>;
   findAll(params: BlogParams): Promise<PaginatedResponse<PostResponseDto>>;
    findById(id: number): Promise<GenericResponse<PostResponseDto>>;
    update(id: number, data: UpdatePostDto): Promise<GenericResponse<PostResponseDto>>;
    delete(id: number): Promise<GenericResponse<boolean>>;
}






export class PostService implements IPostService {
    private readonly repo: RedisCache;
    constructor(repo: RedisCache) {
      this.repo = repo;
    }

    async createPost(data: CreatePostDto): Promise<GenericResponse<PostResponseDto>>  {
        const post = await this.repo.create(data);
        const dto =  this.toResponseDto(post);
     return ResponseHelper.success<PostResponseDto>(
      dto,
      "Post created successfully",
      201
    );
    }

  async findAll(params: BlogParams): Promise<PaginatedResponse<PostResponseDto>> {
    const pageNumber = params.pageNumber || 1;
    const pageSize = params.pageSize || 10;

    const { items, totalCount } = await this.repo.findAll(params);

    const pagination = new PaginationInfo();  
    pagination.pageNumber = pageNumber;
    pagination.pageSize = pageSize;
    pagination.totalCount = totalCount;

    const data = items.map((post) => this.toResponseDto(post));

    return PaginatedResponseHelper.success<PostResponseDto>(
      data,
      pagination,
      "Posts retrieved successfully"
    );
  }

async findById(id: number): Promise<GenericResponse<PostResponseDto>> {
    const post = await this.repo.findById(id);

    if (!post) {
      // If you still want to use NotFoundException + global error handler:
      // throw new NotFoundException("Post not found", ["Post not found"]);
        return ResponseHelper.error(
        "Post not found",
        404,
      );
    }

    return ResponseHelper.success<PostResponseDto>(
      this.toResponseDto(post),
      "Post retrieved successfully"
    );
  }


      async update(
    id: number,
    data: UpdatePostDto
  ): Promise<GenericResponse<PostResponseDto>> {
    const post = await this.repo.update(id, data);

    if (!post) {
      return ResponseHelper.error(
        "Post not found",
        404,
        ["Post not found"]
      );
    }

    return ResponseHelper.success<PostResponseDto>(
      this.toResponseDto(post),
      "Post updated successfully"
    );
  }

  async delete(id: number): Promise<GenericResponse<boolean>> {
    // Assuming repo.delete throws if not found OR silently ignores missing id.
    // If it returns a boolean, you can use that to determine 404 vs 200.
    await this.repo.delete(id);

    return ResponseHelper.success<boolean>(
      true,
      "Post deleted successfully"
    );
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