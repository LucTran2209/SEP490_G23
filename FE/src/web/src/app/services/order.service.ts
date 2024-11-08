import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderSlug } from '../configs/api.configs';
import { BaseResponseApi } from '../interfaces/api.interface';
import { OrderCreateRequest, OrderResultService } from '../interfaces/order.interface';
import { AppHttpClientService } from './app-http-client.service';
import { HttpHeaders } from '@angular/common/http';
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

  createOrders(formData: FormData): Observable<BaseResponseApi<any>> {
    const header = new HttpHeaders();
    header.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post<BaseResponseApi<any>>(OrderSlug.AddOrder.api, formData, header,true);
  }
}
