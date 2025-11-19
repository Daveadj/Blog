import prisma from "../../context/prisma";
import { BlogParams } from "../../Dtos/blogParams";
import { CreatePostDto, UpdatePostDto } from "../../Dtos/post.dto";
import { Prisma } from "../../generated/prisma/client";
import { Post } from "../../models/post";
import { IPostRepository } from "../interfaces/IPostRepository";

export class PostRepository implements IPostRepository{
    create(data: CreatePostDto): Promise<Post> {
       return prisma.post.create({ data });
    }
  async findAll(params: BlogParams): Promise<{ items: any[]; totalCount: number }> {
    const pageNumber = params.pageNumber || 1;
    const pageSize = params.pageSize || 10;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const where: any = {};

    if (params.searchTerm) {
      where.OR = [
        { title: { contains: params.searchTerm } },
        { content: { contains: params.searchTerm } }
      ];
    }

    if (params.dateFrom || params.dateTo) {
      where.createdAt = {};
      if (params.dateFrom) {
        (where.createdAt as any).gte = params.dateFrom;
      }
      if (params.dateTo) {
        (where.createdAt as any).lte = params.dateTo;
      }
    }

    const [items, totalCount] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" }
      }),
      prisma.post.count({ where })
    ]);

    return { items, totalCount };
  }      
    findById(id: number): Promise<Post | null> {
       return prisma.post.findUnique({ where: { id } });
    }
    update(id: number,data: UpdatePostDto): Promise<Post | null> {
       return prisma.post.update({ where: { id }, data: { 
        ...(data.title && { title: data.title }),
        ...(data.content && { content: data.content })
    } });
    }
    delete(id: number): Promise<Post | null> {
       return prisma.post.delete({ where: { id } });
    }
    
}
    
