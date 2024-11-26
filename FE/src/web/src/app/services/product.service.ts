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
  SearchProduct,
} from '../interfaces/product.interface';
import { cleanParams } from '../utils/anonymous.helper';
import { AppHttpClientService } from './app-http-client.service';
import { HttpParams } from '@angular/common/http';

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
  listProduct(search: SearchProduct): Observable<ProductDtoResponse> {
    return this.httpClient.post<ProductDtoResponse>(ProductSlug.ListProduct.api, search);
  }
  private transformParams(params: any): any {
    const transformedParams: any = {};

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];

        if (Array.isArray(value)) {
          // Với mảng, thêm từng giá trị dưới dạng tham số riêng lẻ
          value.forEach((item: string | number) => {
            transformedParams[key] = transformedParams[key] || [];
            transformedParams[key].push(item);
          });
        } else if (value !== undefined && value !== null) {
          // Với giá trị không phải mảng, thêm trực tiếp
          transformedParams[key] = value;
        }
      }
    }

    return transformedParams;
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
