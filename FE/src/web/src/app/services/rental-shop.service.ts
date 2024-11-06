import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { RentalShopResultService } from '../interfaces/rental-shop.interface';
import { Observable } from 'rxjs';
import { RentalShopSlug } from '../configs/api.configs';

@Injectable({
  providedIn: 'root'
})
export class RentalShopService {

  constructor(private http: HttpClient, private httpClient: AppHttpClientService) { }
  getRentalShop(id: string): Observable<RentalShopResultService>{
    return this.httpClient.get<RentalShopResultService>(RentalShopSlug.GetRentalShop.api + id);
  }
}
