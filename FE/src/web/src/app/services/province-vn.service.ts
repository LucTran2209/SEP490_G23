import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAddressEsgoo } from '../interfaces/province.interface';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProvinceVNService {
  private ADDRESS_VIETNAM_URL = 'https://esgoo.net/api-tinhthanh/';
  constructor(private httpClient: AppHttpClientService) {}

  getListProvince(): Observable<ResponseAddressEsgoo> {
    return this.httpClient.post(`${this.ADDRESS_VIETNAM_URL}1/0.htm`);
  }

  getListDistrict(id: string | number): Observable<ResponseAddressEsgoo> {
    return this.httpClient.post(`${this.ADDRESS_VIETNAM_URL}2/${id}.htm`);
  }

  getListWardCommune(id: string | number): Observable<ResponseAddressEsgoo> {
    return this.httpClient.post(`${this.ADDRESS_VIETNAM_URL}3/${id}.htm`);
  }
}
