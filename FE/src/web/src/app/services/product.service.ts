import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductOutputDto, ProductResultService } from '../interfaces/product.interface';
import { Observable, of } from 'rxjs';
import { ProductSlug } from '../configs/api.configs';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: ProductResultService = 
  {
    "statusCode": "OK",
    "message": "Product list retrieved successfully.",
    "data": [
        {
          id: "6e8a14df-a54c-466c-b768-5207573b99db",
          productName: "Máy Khoan Cầm Tay",
          description: "Máy khoan đa năng, công suất cao.",
          quantity: 10,
          price: 150000,
          evaluate: 4.5,
          images: "https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg",
          rentalShopName: "ABC Rentals"
        },
        {
          id: "6943a84b-63c3-48bf-be2b-32b3f842f98b",
          productName: "Máy Cắt Cỏ",
          description: "Máy cắt cỏ chạy xăng, phù hợp cho mọi địa hình.",
          quantity: 5,
          price: 200000,
          evaluate: 4.2,
          images: "https://cdn.tgdd.vn/Files/2016/10/25/904759/may-giat-mini-la-gi-nen-mua-hay-khong--25.jpg",
          rentalShopName: "XYZ Rentals"
        },
        {
          id: "d25142a1-d51b-4e55-895c-424ce39410af",
          productName: "TOYBOOY",
          description: "FUNNY",
          quantity: 3,
          price: 50000,
          evaluate: 4.9,
          images: "https://cdn.tgdd.vn/Files/2016/10/25/904759/may-giat-mini-la-gi-nen-mua-hay-khong--20.jpg",
          rentalShopName: "FUNNY Rentals"
        },
        {
          id: "6e8a14df-a54c-466c-b768-5207573b99db",
          productName: "Máy Khoan Cầm Tay",
          description: "Máy khoan đa năng, công suất cao.",
          quantity: 10,
          price: 150000,
          evaluate: 4.5,
          images: "https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg",
          rentalShopName: "ABC Rentals"
        },
        {
          id: "6943a84b-63c3-48bf-be2b-32b3f842f98b",
          productName: "Máy Cắt Cỏ",
          description: "Máy cắt cỏ chạy xăng, phù hợp cho mọi địa hình.",
          quantity: 5,
          price: 200000,
          evaluate: 4.2,
          images: "https://cdn.tgdd.vn/Files/2016/10/25/904759/may-giat-mini-la-gi-nen-mua-hay-khong--25.jpg",
          rentalShopName: "XYZ Rentals"
        },
        {
          id: "d25142a1-d51b-4e55-895c-424ce39410af",
          productName: "TOYBOOY",
          description: "FUNNY",
          quantity: 3,
          price: 50000,
          evaluate: 4.9,
          images: "https://cdn.tgdd.vn/Files/2016/10/25/904759/may-giat-mini-la-gi-nen-mua-hay-khong--20.jpg",
          rentalShopName: "FUNNY Rentals"
        },
        {
          id: "6e8a14df-a54c-466c-b768-5207573b99db",
          productName: "Máy Khoan Cầm Tay",
          description: "Máy khoan đa năng, công suất cao.",
          quantity: 10,
          price: 150000,
          evaluate: 4.5,
          images: "https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg",
          rentalShopName: "ABC Rentals"
        },
        {
          id: "6943a84b-63c3-48bf-be2b-32b3f842f98b",
          productName: "Máy Cắt Cỏ",
          description: "Máy cắt cỏ chạy xăng, phù hợp cho mọi địa hình.",
          quantity: 5,
          price: 200000,
          evaluate: 4.2,
          images: "https://cdn.tgdd.vn/Files/2016/10/25/904759/may-giat-mini-la-gi-nen-mua-hay-khong--25.jpg",
          rentalShopName: "XYZ Rentals"
        },
      
    ]
  }
  

  constructor(private http: HttpClient, private httpClient: AppHttpClientService) { }
  listProduct(): Observable<ProductResultService>{
    // return this.httpClient.get<ProductResultService>(ProductSlug.ListProduct.api);
    return of(this.products);
  }
}
