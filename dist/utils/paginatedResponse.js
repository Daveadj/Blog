"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponseHelper = exports.PaginationInfo = void 0;
class PaginationInfo {
    constructor() {
        this.pageNumber = 1;
        this.pageSize = 10;
        this.totalCount = 0;
    }
    get totalPages() {
        return Math.ceil(this.totalCount / this.pageSize);
    }
    get hasNextPage() {
        return this.pageNumber < this.totalPages;
    }
    get hasPreviousPage() {
        return this.pageNumber > 1;
    }
}
exports.PaginationInfo = PaginationInfo;
class PaginatedResponseHelper {
    static success(data, pagination, message = "Data retrieved successfully", statusCode = 200) {
        return {
            isSuccess: true,
            message,
            data,
            errors: [],
            pagination,
            statusCode,
            timestamp: new Date()
        };
    }
}
exports.PaginatedResponseHelper = PaginatedResponseHelper;
