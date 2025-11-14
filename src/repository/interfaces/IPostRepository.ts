import { CreatePostDto, UpdatePostDto } from "../../Dtos/post.dto";
import { Post } from "../../models/post";


export interface IPostRepository {
    create(data:CreatePostDto): Promise<Post>;
    findAll(): Promise<Post[]>;
    findById(id: number): Promise<Post | null>;
    update(id: number,data: UpdatePostDto): Promise<Post | null>;
    delete(id: number): Promise<Post | null>;
}
    