export interface ApiResponse {
  message: string;
  isError: boolean;
  data: any;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  itemCount: number;
  pageLength: number;
  currentPage: number;
  pageCount: number;
  items: T[];
}
