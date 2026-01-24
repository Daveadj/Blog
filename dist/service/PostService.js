"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const genericResponse_1 = require("../utils/genericResponse");
const paginatedResponse_1 = require("../utils/paginatedResponse");
class PostService {
    constructor(repo) {
        this.repo = repo;
    }
    async createPost(data) {
        const post = await this.repo.create(data);
        const dto = this.toResponseDto(post);
        return genericResponse_1.ResponseHelper.success(dto, "Post created successfully", 201);
    }
    async findAll(params) {
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 10;
        const { items, totalCount } = await this.repo.findAll(params);
        const pagination = new paginatedResponse_1.PaginationInfo();
        pagination.pageNumber = pageNumber;
        pagination.pageSize = pageSize;
        pagination.totalCount = totalCount;
        const data = items.map((post) => this.toResponseDto(post));
        return paginatedResponse_1.PaginatedResponseHelper.success(data, pagination, "Posts retrieved successfully");
    }
    async findById(id) {
        const post = await this.repo.findById(id);
        if (!post) {
            // If you still want to use NotFoundException + global error handler:
            // throw new NotFoundException("Post not found", ["Post not found"]);
            return genericResponse_1.ResponseHelper.error("Post not found", 404);
        }
        return genericResponse_1.ResponseHelper.success(this.toResponseDto(post), "Post retrieved successfully");
    }
    async update(id, data) {
        const post = await this.repo.update(id, data);
        if (!post) {
            return genericResponse_1.ResponseHelper.error("Post not found", 404, ["Post not found"]);
        }
        return genericResponse_1.ResponseHelper.success(this.toResponseDto(post), "Post updated successfully");
    }
    async delete(id) {
        // Assuming repo.delete throws if not found OR silently ignores missing id.
        // If it returns a boolean, you can use that to determine 404 vs 200.
        await this.repo.delete(id);
        return genericResponse_1.ResponseHelper.success(true, "Post deleted successfully");
    }
    toResponseDto(post) {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt ?? post.createdAt,
        };
    }
}
exports.PostService = PostService;
