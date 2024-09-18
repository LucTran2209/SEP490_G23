export interface BaseResponseApi<T> {
  statusCode: number;
  data: T;
  message: string;
}

export interface BaseResponseRecords<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}


export type ApiType = 'common' | 'auth' | 'admin' | 'hra' | 'cra';
