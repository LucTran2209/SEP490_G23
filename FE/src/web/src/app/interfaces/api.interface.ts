import { Province } from './province.interface';

export interface BaseResponseApi<T> {
  statusCode: number;
  // statusCode: string;
  data: T;
  message: string;
}

export interface BaseResponseRecords<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}

export interface BaseResponseAddressApi {
  error: number;
  error_text: string;
  data_name: string;
  data: Province[] | [];
}

