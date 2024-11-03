import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { FeatureAppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { StorageService } from '../../../../services/storage.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { ProductItemResponse } from '../../../../interfaces/product.interface';
import { selectDepositActualPriceById, selectRentalActualPriceById } from '../../../../features/common/state/rental/rental.selectors';


interface IProductShortSearch {
  id: string | number;
  productName: string;
  rentalPrice: number;
  depositPrice: number;
  rentalLimitDays: number;
  images: string;
}


@Component({
  selector: 'app-form-rental-product-v2',
  templateUrl: './form-rental-product-v2.component.html',
  styleUrl: './form-rental-product-v2.component.scss'
})
export class FormRentalProductV2Component   implements OnInit, OnDestroy {
  productIdParam?: string;
  isConfirmLoading = false;
  isVisible = false;
  inputValue?: string;
  options: Array<IProductShortSearch> = [];
  tags?: IProductShortSearch[];
  productRentalDetailArray$?: Observable<ProductItemResponse[]>;

  rentalPriceActual$?: Observable<string | number>;
  depositPriceActual$?: Observable<string | number>;
  //date time

   //subscription
  private routeSubscription?: Subscription;
  //date time

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  handleCloseTag(removedTag: {}): void {
    this.tags = this.tags?.filter((tag) => tag !== removedTag);
  }
  
  
  onChooseRental(headerTef: TemplateRef<any>){

  }

  onChooseDateCustom(){

  }


  onSearchProductShort(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.options = new Array(this.getRandomInt(5, 15))
      .join('.')
      .split('.')
      .map((_item, idx) => ({
        id: idx + 1,
        productName: `${value}${idx}`,
        depositPrice: 20000,
        images:
          'https://cdn.tgdd.vn/Files/2014/12/06/586947/y-nghia-cua-toc-do-quay-vat-tren-may-giat-6.jpg',
        rentalLimitDays: 12,
        rentalPrice: 30000,
      }));
  }

  onSelectProduct(e: IProductShortSearch) {
    this.tags?.push(e);
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  // on choose more
  onChooseRentalMore(){
    
  }

  selectStateFromNgRx() {
    if (this.productIdParam) {
      this.rentalPriceActual$ = this.store
        .select(selectRentalActualPriceById(this.productIdParam))
        .pipe(filter((value): value is string | number => value !== undefined));

      this.depositPriceActual$ = this.store
        .select(selectDepositActualPriceById(this.productIdParam))
        .pipe(filter((value): value is string | number => value !== undefined));
    }
  }

  dispatchActionNessarray() {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalTimerService: RentalTimerService,
    private store: Store<FeatureAppState>,
    private storageService: StorageService,
    private ToasMS: MessageResponseService
  ) {}

  ngOnInit(): void {
    this.productIdParam = this.route.snapshot.paramMap.get('id') ?? '';
    this.dispatchActionNessarray();
    this.selectStateFromNgRx();


    //unsubscrib
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.rentalTimerService.clearState(); 
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
