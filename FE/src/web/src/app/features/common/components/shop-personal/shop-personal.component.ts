import { Component, OnInit } from '@angular/core';
import { ProductItemResponse, ProductOutputDto } from '../../../../interfaces/product.interface';
import { categoryOptions } from '../../../../mock/post';
import { selectSortByOrder } from '../../../../configs/post.config';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../../../../store/app.state';
import * as selectShopRentalProduct from '../../state/shop/shop-personal.reducer';
import * as ShopRentalProductActions from '../../state/shop/shop-personal.actions';
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

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  goDown0() {
    this.scroller.scrollToAnchor("viewEnjoy");
  }

  goDown1() {
    this.scroller.scrollToAnchor("targetAllProduct");
  }

  goDown2() {
    this.scroller.scrollToAnchor("MoreRental");
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

  constructor(private scroller: ViewportScroller, private route: ActivatedRoute, private store: Store<FeatureAppState>) {
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
];

