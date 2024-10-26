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

  listMyOrder(pageIndex: number, pageSize: number): Observable<OrderResultService>{
    let params: any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    };
    return this.httpClient.get<OrderResultService>(OrderSlug.ListOrder.api, params );
  }
}
