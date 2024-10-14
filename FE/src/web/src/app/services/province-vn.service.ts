import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { BaseResponseAddressApi } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class ProvinceVnService {
  readonly BASE_URL_ESGOO = 'https://esgoo.net/api-tinhthanh/';
  constructor(private httpClient: AppHttpClientService) {}

  getProvinces() {
    return this.httpClient.post<BaseResponseAddressApi>(
      this.BASE_URL_ESGOO + `1/0.htm`
    );
  }
  getDistricts(id: string) {
    return this.httpClient.post<BaseResponseAddressApi>(
      this.BASE_URL_ESGOO + `2/${id}.htm`
    );
  }
  getWardOrCommunes(id: string) {
    return this.httpClient.post<BaseResponseAddressApi>(
      this.BASE_URL_ESGOO + `3/${id}.htm`
    );
  }
}
