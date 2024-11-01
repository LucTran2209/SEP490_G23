import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { selectSortByOrder } from '../../../../configs/post.config';
import { ProductItemResponse, ProductOutputDto } from '../../../../interfaces/product.interface';
import { categoryOptions } from '../../../../mock/post';
import { FeatureAppState } from '../../../../store/app.state';
import * as ShopRentalProductActions from '../../state/shop/shop-personal.actions';
import * as selectShopRentalProduct from '../../state/shop/shop-personal.reducer';
@Component({
  selector: 'app-shop-personal',
  templateUrl: './shop-personal.component.html',
  styleUrl: './shop-personal.component.scss'
})
export class ShopPersonalComponent implements OnInit{
  // param shop url
  paramHave: string | null; 
  productList: ProductOutputDto[] = mockDataList;
  productListShopFilter$?: Observable<ProductItemResponse[]>;
  // pagination 
  categoryOptions = categoryOptions;
  selectedValue = null;
  groupOptionFilterSelect: OptionSelect[] = selectSortByOrder;
  visible = false;

  open(isOpen: boolean): void {
    this.visible = isOpen;
  }

  close(): void {
    this.visible = false;
  }

  selectStateFromNgRx(){
 this.productListShopFilter$ = this.store.select(selectShopRentalProduct.selectData).pipe(
  tap(res => {console.log('>>> line 52',res);})
 );
  }

  dispatchActionNessarray(){
    if(this.paramHave){
      this.store.dispatch(ShopRentalProductActions.getListProductRentalShop({params: null, shopId: this.paramHave}))
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dispatchActionNessarray();
    this.selectStateFromNgRx();
  }

  constructor(private route: ActivatedRoute, private store: Store<FeatureAppState>) {
    this.paramHave = this.route.snapshot.paramMap.get('id');
  }
}

const mockDataList: ProductOutputDto[] = [
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
];

