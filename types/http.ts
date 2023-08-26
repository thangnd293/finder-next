export interface Error<T = any> {
  message: string;
  statusCode: string;
  timestamp: string;
  path: string;
  data: T;
}

export interface MutateSuccess {
  success: boolean;
  message: string;
}
