import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { HttpClient } from '@angular/common/http';
import { CategoryResultService, SubCategoryResultService } from '../interfaces/category.interface';
import { Observable } from 'rxjs';
import { CategorySlug } from '../configs/api.configs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private httpClient: AppHttpClientService) { }
  
  listCategory(): Observable<CategoryResultService>{
    return this.httpClient.get<CategoryResultService>(CategorySlug.ListCategory.api);
  }
  listSubCategory(): Observable<SubCategoryResultService>{
    return this.httpClient.get<SubCategoryResultService>(CategorySlug.ListSubCategory.api);
  }
}
