export namespace Api {
  export interface SuccessResponse<T> {
    status: number;
    timestamp: string;
    message: string;
    data: T;
  }

  export interface ErrorResponse {
    status: number;
    timestamp: string;
    path: string;
    message: string;
    errors?: {
      field: string;
      value: string;
      reason: string;
    }[];
  }

  export interface PaginationResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    page: number;
  }

  export interface PagedApiResponse<T> extends SuccessResponse<T[]> {
    pagination: PaginationResponse;
  }

  // 자주 사용하는 응답 alias
  export type ListResponse<T> = SuccessResponse<T[]>;
  export type ItemResponse<T> = SuccessResponse<T>;
  export type EmptyResponse = SuccessResponse<null>;
}
