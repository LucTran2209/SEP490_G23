import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { rechargeMoney, rechargeResultService } from '../interfaces/payment.interface';
import { BaseResponseApi } from '../interfaces/api.interface';
import { Observable } from 'rxjs';
import { PaymentSlug } from '../configs/api.configs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: AppHttpClientService) {}
  createVoucher(data: rechargeMoney): Observable<rechargeResultService>{
    return this.httpClient.post<rechargeResultService>(PaymentSlug.RechargeMoney.api, data)
  }
}
