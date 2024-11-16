import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { FeedBackSlug, OrderSlug } from '../configs/api.configs';
import {
  BaseResponseApi,
  BaseResponseApiV2,
} from '../interfaces/api.interface';
import {
  OrderDetailResultService,
  OrderListResponse,
  OrderResultService,
} from '../interfaces/order.interface';
import { AppHttpClientService } from './app-http-client.service';
import { cleanParams } from '../utils/anonymous.helper';
import { FeedBackInputDto } from '../interfaces/feedback.interface';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: AppHttpClientService) {}

  listMyOrder(pageIndex: number, pageSize: number, nearDays: number): Observable<OrderResultService>{
    let params: any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
      NearDays: nearDays.toString(),
    };
    return this.httpClient.get<OrderResultService>(
      OrderSlug.ListMyOrder.api,
      params
    );
  }

  /**
   *
   * @param orderId
   * @returns
   * @description: get order detail
   */
  getOrder(orderId: string): Observable<OrderDetailResultService> {
    return this.httpClient.get<OrderDetailResultService>(OrderSlug.GetOrder.api + orderId );
  }

  /**
   *
   * @param formData
   * @returns
   * @description: create order one or more
   */
  createOrders(formData: FormData): Observable<BaseResponseApi<any>> {
    const header = new HttpHeaders();
    header.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post<BaseResponseApi<any>>(
      OrderSlug.AddOrder.api,
      formData,
      header,
      true
    );
  }

  /**
   *
   * @param param
   * @returns
   * @description list order for lessor
   */
  listOrderLessor(
    param: any
  ): Observable<BaseResponseApiV2<OrderListResponse>> {
    const cleanedParams = cleanParams(param);
    return this.httpClient
      .get<BaseResponseApiV2<OrderListResponse>>(
        OrderSlug.ListOrderLessor.api,
        cleanedParams
      )
      .pipe(
        catchError((error) => {
          console.error('API error:', error);
          const errorResponse: BaseResponseApiV2<OrderListResponse> = {
            statusCode: 500,
            data: {
              items: [],
              pageIndex: -1,
              pageSize: 0,
              totalCount: 0,
            },
            message: 'Failed to fetch order list',
          };
          return of(errorResponse);
        })
      );
  }

  getOrderDetailLessor(
    pid: string
  ): Observable<BaseResponseApi<OrderListResponse>> {
    return this.httpClient
      .get<BaseResponseApi<OrderListResponse>>(
        OrderSlug.GetOrderLessor.api + `${pid}`
      )
      .pipe(
        catchError((error) => {
          console.error('API error:', error);
          return of(error);
        })
      );
  }
  createFeedBack(data: FeedBackInputDto): Observable<BaseResponseApi<null>>{
    return this.httpClient.post<BaseResponseApi<null>>(FeedBackSlug.CreateFeedBack.api, data);
  }
}
