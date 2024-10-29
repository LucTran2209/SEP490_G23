import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { OrderSlug } from '../configs/api.configs';
import { BaseResponseApi } from '../interfaces/api.interface';
import { OrderResultService } from '../interfaces/order.interface';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private httpClient: AppHttpClientService) { }

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
}
