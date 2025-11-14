import prisma from "../../context/prisma";
import { CreatePostDto, UpdatePostDto } from "../../Dtos/post.dto";
import { Post } from "../../models/post";
import { IPostRepository } from "../interfaces/IPostRepository";

export class PostRepository implements IPostRepository{
    create(data: CreatePostDto): Promise<Post> {
       return prisma.post.create({ data });
    }
    findAll(): Promise<Post[]> {
       return prisma.post.findMany();
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
    
