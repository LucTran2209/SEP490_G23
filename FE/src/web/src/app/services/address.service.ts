import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: AppHttpClientService) {}

  getAddress(input: string): Observable<any> {
    const data = {
      api_key: environment.apiKeyGoong,
      input,
    };
    const url = `${environment.apiUrlGoong}AutoComplete`;
    return this.http.get(url,data);
  }
  getAddressDetail(placeId: string): Observable<any> {
    const data = {
      place_id: placeId,
      api_key: environment.apiKeyGoong,
    };
    return this.http.get(`${environment.apiUrlGoong}Detail`, data);
  }
}
