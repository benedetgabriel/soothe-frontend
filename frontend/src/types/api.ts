export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  errors: ApiError[];
}

export interface ApiError {
  field: string | null;
  message: string;
}
