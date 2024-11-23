import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { rechargeMoney, rechargeResultService } from '../interfaces/payment.interface';
import { BaseResponseApi } from '../interfaces/api.interface';
import { Observable } from 'rxjs';
import { PaymentSlug } from '../configs/api.configs';
import { Deposit } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: AppHttpClientService) {}
  rechargeMoney(data: rechargeMoney): Observable<rechargeResultService>{
    return this.httpClient.post<rechargeResultService>(PaymentSlug.RechargeMoney.api, data)
  }
  depositMoney(data: Deposit): Observable<BaseResponseApi<null>>{
    return this.httpClient.post<BaseResponseApi<null>>(PaymentSlug.DepositMoney.api, data)
  }
}
