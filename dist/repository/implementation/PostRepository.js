"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const prisma_1 = __importDefault(require("../../context/prisma"));
class PostRepository {
    create(data) {
        return prisma_1.default.post.create({ data });
    }
    async findAll(params) {
        const pageNumber = params.pageNumber || 1;
        const pageSize = params.pageSize || 10;
        const skip = (pageNumber - 1) * pageSize;
        const take = pageSize;
        const where = {};
        if (params.searchTerm) {
            where.OR = [
                { title: { contains: params.searchTerm } },
                { content: { contains: params.searchTerm } }
            ];
        }
        if (params.dateFrom || params.dateTo) {
            where.createdAt = {};
            if (params.dateFrom) {
                where.createdAt.gte = params.dateFrom;
            }
            if (params.dateTo) {
                where.createdAt.lte = params.dateTo;
            }
        }
        const [items, totalCount] = await Promise.all([
            prisma_1.default.post.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: "desc" }
            }),
            prisma_1.default.post.count({ where })
        ]);
        return { items, totalCount };
    }
    findById(id) {
        return prisma_1.default.post.findUnique({ where: { id } });
    }
    update(id, data) {
        return prisma_1.default.post.update({ where: { id }, data: {
                ...(data.title && { title: data.title }),
                ...(data.content && { content: data.content })
            } });
    }
    delete(id) {
        return prisma_1.default.post.delete({ where: { id } });
    }
}
exports.PostRepository = PostRepository;
