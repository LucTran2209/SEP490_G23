export interface BaseResponseApi<T> {
    code: number;
    data: T;
    message: string;
    success: boolean;
    errors: string;
  }
  
  export interface BaseResponseRecords<T> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    items: T[];
  }
  

  export type ApiType = 'common' | 'auth' | 'admin' | 'student' | 'staff';
