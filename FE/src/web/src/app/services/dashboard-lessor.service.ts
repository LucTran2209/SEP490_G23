import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable } from 'rxjs';
import { BaseResponseApi } from '../interfaces/api.interface';

export interface ResponseCardOverview {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardLessorService {
  constructor(private httpClient: AppHttpClientService) {}

  getCardOverview(
    bodyReq: any
  ): Observable<BaseResponseApi<ResponseCardOverview>> {
    return this.httpClient.get<BaseResponseApi<ResponseCardOverview>>(
      'Statistical/StatisticProduct',
      bodyReq
    );
  }

  getDataChartTopSubCategory(bodyReq: any): Observable<BaseResponseApi<any>> {
    return this.httpClient.get('Statistical/table1', bodyReq);
  }

  getDataChartRevenue1(bodyReq: any): Observable<BaseResponseApi<any>> {
    return this.httpClient.get('Statistical/table2ByMonth', bodyReq);
  }
  getDataChartRevenue2(bodyReq: any): Observable<BaseResponseApi<any>> {
    return this.httpClient.get('Statistical/table2ByWeek', bodyReq);
  }

  getDataChartOrder(bodyReq: any): Observable<BaseResponseApi<any>> {
    return this.httpClient.get('Statistical/table3', bodyReq);
  }
}
