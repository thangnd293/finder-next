export interface IError<T = any> {
  message: string;
  statusCode: string;
  timestamp: string;
  path: string;
  data: T;
}

export interface IMutateSuccess {
  success: boolean;
  message: string;
}
