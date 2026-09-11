export interface ApiResponse {
  message: string;
  isError: boolean;
  data: any;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  // pageCount: number;
  items: T[];
}
