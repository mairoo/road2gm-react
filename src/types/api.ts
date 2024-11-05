export interface ApiResponse<T> {
  status: number;
  timestamp: string;
  message: string;
  data: T;
}

export interface PaginationResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  page: number;
}

export interface PagedApiResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationResponse;
}

export interface ApiErrorResponse {
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

// 자주 사용하는 응답 alias
export type ApiListResponse<T> = ApiResponse<T[]>;
export type ApiItemResponse<T> = ApiResponse<T>;
export type ApiEmptyResponse = ApiResponse<null>;
