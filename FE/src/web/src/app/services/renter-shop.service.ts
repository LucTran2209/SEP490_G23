import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable } from 'rxjs';
import { BaseResponseApi } from '../interfaces/api.interface';
import { StepRegisterLessor } from '../configs/api.configs';

@Injectable({
  providedIn: 'root'
})
export class RenterShopService {

  constructor(private httpClient: AppHttpClientService) { }

  registerToLessor(formData: FormData): Observable<BaseResponseApi<any>>{
    return this.httpClient.post<BaseResponseApi<any>>(StepRegisterLessor.Step_register.api, formData);
  }
}
