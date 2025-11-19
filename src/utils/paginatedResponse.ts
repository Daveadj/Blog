import { GenericResponse } from "./genericResponse";

export class PaginationInfo {
  pageNumber: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get hasNextPage(): boolean {
    return this.pageNumber < this.totalPages;
  }

  get hasPreviousPage(): boolean {
    return this.pageNumber > 1;
  }
}

export interface PaginatedResponse<T> extends GenericResponse<T[]> {
  pagination: PaginationInfo;
}

export class PaginatedResponseHelper {
  static success<T>(
    data: T[],
    pagination: PaginationInfo,
    message: string = "Data retrieved successfully",
    statusCode: number = 200
  ): PaginatedResponse<T> {
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