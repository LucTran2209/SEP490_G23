import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable } from 'rxjs';
import { BaseResponseApi } from '../interfaces/api.interface';
import { StepRegisterLessor } from '../configs/api.configs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RenterShopService {
  constructor(private httpClient: AppHttpClientService) {}

  registerToLessor(formData: FormData): Observable<BaseResponseApi<any>> {
    const header = new HttpHeaders();
    header.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post<BaseResponseApi<any>>(
      StepRegisterLessor.Step_register.api,
      formData,
      header,
      true
    );
  }
}
