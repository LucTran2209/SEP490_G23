export interface ProductOutputDto {
    id: string;
    productName: string;
    description: string;
    quantity: number;
    price: number;
    evaluate: number;
    images: string;
    rentalShopName: string;
  }
  export interface ProductResultService {
    statusCode: string;
    message: string;
    data: ProductOutputDto[];
  }