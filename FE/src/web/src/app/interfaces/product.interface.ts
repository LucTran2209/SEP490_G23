export interface ProductOutputDto {
    id: string;
    productName: string;
    description: string;
    quantity: number;
    subCategoryId: string;
    rentalShopName: string;
    rentalPrice: number;
    depositPrice: number;
    rentalLimitDays: number;
    evaluate: number;
    images: string[];
}
export interface ProductInputDto {
  productName: string,
  description: string,
  quantity: number,
  subCategoryId: string,
  rentalShopId: string,
  rentalPrice: number,
  depositPrice: number,
  rentalLimitDays: number,
  evaluate: number,
  images: File[], 
}
export interface UpdateProductInputDto{
  productName: string,
  description: string,
  quantity: number,
  rentalPrice: number,
  depositPrice: number,
  rentalLimitDays: number,
  evaluate: number,
  images: (File | string)[], 
}
  export interface ProductResultService {
    statusCode: string;
    message: string;
    data: {
      items : ProductOutputDto[];
      pageSize: number;
      pageIndex: number;
      totalCount: number;
    };

  }