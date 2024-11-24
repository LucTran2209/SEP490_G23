import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { DeactiveShop, RentalShopResultService, UpdateRentalShop } from '../interfaces/rental-shop.interface';
import { Observable } from 'rxjs';
import { RentalShopSlug, RequestShopSlug } from '../configs/api.configs';
import { ChangeStatusRequestShop, RequestShopDetailResultService, RequestShopResultService } from '../interfaces/request-shop.interface';
import { BaseResponseApi } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class RentalShopService {

  constructor(private http: HttpClient, private httpClient: AppHttpClientService) { }
  getRentalShop(id: string): Observable<RentalShopResultService>{
    return this.httpClient.get<RentalShopResultService>(RentalShopSlug.GetRentalShop.api + id);
  }
  updateRentalShop(formData: FormData,id: string): Observable<BaseResponseApi<null>>{
    return this.httpClient.put<BaseResponseApi<null>>(RentalShopSlug.UpdateRentalShop.api  + id, formData );
  }
  deactiveRentalShop(formData: DeactiveShop): Observable<BaseResponseApi<null>>{
    return this.httpClient.put<BaseResponseApi<null>>(RentalShopSlug.DeactiveRentalShop.api, formData );
  }
  listRentalShop(pageIndex: number, pageSize: number): Observable<RequestShopResultService> {
    let params: any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    };
    return this.httpClient.get<RequestShopResultService>(RentalShopSlug.ListRentalShop.api, params );
  }
  requestShopList(pageIndex: number, pageSize: number, ShopName?: string): Observable<RequestShopResultService>{
    let params: any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    };
    if (ShopName) params.ShopName = ShopName;
    return this.httpClient.get<RequestShopResultService>(RequestShopSlug.RequestShopList.api, params );
  }
  requestShopDetail(id: string): Observable<RequestShopDetailResultService>{
    let params: any = {
      id: id,
    };
    return this.httpClient.get<RequestShopDetailResultService>(RequestShopSlug.RequestShopDetail.api, params );
  }
  changeStatusRequestShop(data: ChangeStatusRequestShop): Observable<BaseResponseApi<null>>{
    return this.httpClient.put<BaseResponseApi<null>>(RequestShopSlug.ChangeStatus.api, data );
  }
}
