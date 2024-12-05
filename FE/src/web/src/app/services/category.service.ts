import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { HttpClient } from '@angular/common/http';
import { CategoryInputDto, CategoryResultService, SubcategoryInputDto, SubCategoryResultService } from '../interfaces/category.interface';
import { Observable } from 'rxjs';
import { CategorySlug } from '../configs/api.configs';
import { BaseResponseApi } from '../interfaces/api.interface';

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
  createCategory(data: CategoryInputDto): Observable<BaseResponseApi<null>>{
    return this.httpClient.post<BaseResponseApi<null>>(CategorySlug.CreateCategory.api, data);
  }
  createSubcategory(data: SubcategoryInputDto): Observable<BaseResponseApi<null>>{
    return this.httpClient.post<BaseResponseApi<null>>(CategorySlug.CreateSubCategory.api, data);
  }
}
