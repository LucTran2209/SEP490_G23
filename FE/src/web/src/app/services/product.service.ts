import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSlug } from '../configs/api.configs';
import {
  BaseResponseApi,
  BaseResponseApiV2,
} from '../interfaces/api.interface';
import {
  ProductDtoResponse,
  ProductItemResponse,
  ProductOutputDto,
  ProductResultService,
} from '../interfaces/product.interface';
import { cleanParams } from '../utils/anonymous.helper';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: AppHttpClientService) {}


/**
 * 
 * @param pageIndex 
 * @param pageSize 
 * @param ProductName 
 * @returns 
 */
  listProduct(
    pageIndex: number,
    pageSize: number,
    Search: string,
    Addresses?: string[],
    SubCategory?: string,
    MinPrice?: number,
    MaxPrice?: number,
    Evaluates?: string[],
  ): Observable<ProductDtoResponse> {
    let params: any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
      Search: Search
    };
    if (SubCategory) params.SubCategory = SubCategory;
    if (Evaluates) params.Evaluates = Evaluates;
    if (MinPrice) params.MinPrice = MinPrice;
    if (MaxPrice) params.MaxPrice = MaxPrice;
    if (Addresses) {
      Addresses.forEach(address => {
        params.Addresses = Addresses.join('&Addresses=');
      });
    }
    return this.httpClient.get<ProductDtoResponse>(ProductSlug.ListProduct.api, params);
  }
  listProductByShop(rentalShopId: string, pageIndex: number, pageSize: number, Search?: string, ): Observable<ProductResultService>{
    let params: any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    };
    if (Search) params.Search = Search;
    return this.httpClient.get<ProductResultService>(ProductSlug.ListProductByShopId.api + rentalShopId, params);
  }

  /**
   * 
   * @param data 
   * @returns 
   */
  createProduct(data: FormData): Observable<BaseResponseApi<null>> {
    return this.httpClient.post<BaseResponseApi<null>>(
      ProductSlug.AddProduct.api,
      data
    );
  }

  /**
   * 
   * @param id 
   * @param formData 
   * @returns 
   */
  updateProduct(
    id: string,
    formData: FormData
  ): Observable<BaseResponseApi<null>> {
    return this.httpClient.put<BaseResponseApi<null>>(
      ProductSlug.UpdateProduct.api + id,
      formData
    );
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getProductDetail(
    id: string | number
  ): Observable<BaseResponseApi<ProductItemResponse>> {
    return this.httpClient.get<BaseResponseApi<ProductItemResponse>>(`${ProductSlug.GetDetailProduct.api}/${id}`)
  }

  /**
   * 
   * @param params 
   * @param id 
   * @description common product of shop side renter | guest
   * @returns 
   */
  listProductShopCommon(
    filters: any,
    id: string | number
  ): Observable<BaseResponseApiV2<ProductOutputDto>> {
    const cleanedParams = cleanParams(filters); 
    return this.httpClient.get<BaseResponseApiV2<ProductOutputDto>>(
      `${ProductSlug.RentalShopProduct.api}/${id}`,
      cleanedParams
    );
  }
}
