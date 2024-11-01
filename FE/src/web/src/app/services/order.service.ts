import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderSlug } from '../configs/api.configs';
import { BaseResponseApi } from '../interfaces/api.interface';
import { OrderCreateRequest, OrderResultService } from '../interfaces/order.interface';
import { AppHttpClientService } from './app-http-client.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: AppHttpClientService) { }

  listMyOrder(pageIndex: number, pageSize: number, userId: string): Observable<OrderResultService>{
    let params: any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
      UserId: userId,
    };
    return this.httpClient.get<OrderResultService>(OrderSlug.ListOrder.api, params );
  }
  getOrder(orderId: string): Observable<OrderResultService>{
    let params: any = {
      OrderId: orderId,
    };
    return this.httpClient.get<OrderResultService>(OrderSlug.ListOrder.api, params );
  }

  createOrders(data: OrderCreateRequest): Observable<BaseResponseApi<any>> {
    return this.httpClient.post<BaseResponseApi<any>>(OrderSlug.AddOrder.api, data);
  }
}
