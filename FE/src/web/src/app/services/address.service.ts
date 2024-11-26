import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  constructor(private http: AppHttpClientService) {}
  
  getAddress(input: string): Observable<any> {
    const url = `${environment.apiUrlGoong}?api_key=${environment.apiKeyGoong}&input=${input}`;
    return this.http.get(url);
  }
}
