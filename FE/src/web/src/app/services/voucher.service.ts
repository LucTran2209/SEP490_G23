import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import {
  VoucherDetailOutputDto,
  VoucherDetailResultService,
  VoucherEditInputDto,
  VoucherInputDto,
  VoucherOutputDto,
  VoucherResultService,
} from '../interfaces/voucher.interface';
import { Observable } from 'rxjs';
import { BaseResponseApi } from '../interfaces/api.interface';
import { VoucherSlug } from '../configs/api.configs';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  constructor(private httpClient: AppHttpClientService) {}
  createVoucher(data: VoucherInputDto): Observable<BaseResponseApi<null>> {
    return this.httpClient.post<BaseResponseApi<null>>(
      VoucherSlug.CreateVoucher.api,
      data
    );
  }
  updateVoucher(
    id: string,
    data: VoucherEditInputDto
  ): Observable<BaseResponseApi<null>> {
    return this.httpClient.put<BaseResponseApi<null>>(
      VoucherSlug.UpdateVoucher.api + id,
      data
    );
  }
  deactivateVoucher(id: string): Observable<BaseResponseApi<null>> {
    return this.httpClient.patch<BaseResponseApi<null>>(
      VoucherSlug.DeactivateVoucher.api + id + '/deactivate'
    );
  }
  deleteVoucher(id: string): Observable<BaseResponseApi<null>> {
    return this.httpClient.delete<BaseResponseApi<null>>(
      VoucherSlug.DeleteVoucher.api + id
    );
  }
  listVoucher(id: string): Observable<VoucherResultService>{
    return this.httpClient.get<VoucherResultService>(VoucherSlug.ListVoucher.api + id)
  }
  getVoucher(id: string): Observable<VoucherDetailResultService> {
    return this.httpClient.get<VoucherDetailResultService>(
      VoucherSlug.GetVoucher.api + id
    );
  }
  getListVoucherAvaiable(): Observable<BaseResponseApi<VoucherDetailOutputDto[]>> {
    return this.httpClient.get<BaseResponseApi<VoucherDetailOutputDto[]>>(VoucherSlug.MyVoucher.api);
  }
  myVoucher(): Observable<VoucherDetailResultService>{
    return this.httpClient.get<VoucherDetailResultService>(VoucherSlug.MyVoucher.api)
  }
  saveVoucher(voucherId: string): Observable<BaseResponseApi<null>>{
    return this.httpClient.post<BaseResponseApi<null>>(VoucherSlug.SaveVoucher.api, {voucherId})
  }
}
