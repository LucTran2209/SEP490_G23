import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductOutputDto } from '../interfaces/product.interface';
import { Observable, of } from 'rxjs';
import { PostSlug } from '../configs/api.configs';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private httpClient: AppHttpClientService) { }
}
