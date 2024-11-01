import { Component } from '@angular/core';

@Component({
  selector: 'app-form-rental-product-v2',
  templateUrl: './form-rental-product-v2.component.html',
  styleUrl: './form-rental-product-v2.component.scss'
})
export class FormRentalProductV2Component   {
  // isConfirmLoading = false;
  // isVisible = false;
  // currentRoute?: string;
  // inputNote?: string;
  // options: Array<IProductShortSearch> = [];
  // tags: IProductShortSearch[] = [];
  // productRentalDetail$?: Observable<ProductItemResponse>;
  // rentalPriceActual$?: Observable<number>;
  // depositPriceActual$?: Observable<number>;
  
  // //ngRx

  // //ngRx 


  // //date time
  // rangePickerTime$?: Observable<Date[]>;
  // selectedTimeStart: any;
  // selectedTimeEnd: any;
  // rentalDays: number = 0;
  // private routeSubscription?: Subscription;
  // //date time

  // sliceTagName(tag: string): string {
  //   const isLongTag = tag.length > 20;
  //   return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  // }

  // handleCloseTag(removedTag: {}): void {
  //   this.tags = this.tags.filter((tag) => tag !== removedTag);
  // }

  // onSearchProductShort(e: Event): void {
  //   const value = (e.target as HTMLInputElement).value;
  //   this.options = new Array(this.getRandomInt(5, 15))
  //     .join('.')
  //     .split('.')
  //     .map((_item, idx) => ({
  //       id: idx + 1,
  //       productName: `${value}${idx}`,
  //       depositPrice: 20000,
  //       images:
  //         'https://cdn.tgdd.vn/Files/2014/12/06/586947/y-nghia-cua-toc-do-quay-vat-tren-may-giat-6.jpg',
  //       rentalLimitDays: 12,
  //       rentalPrice: 30000,
  //     }));
  // }

  // onSelectProduct(e: IProductShortSearch) {
  //   this.tags.push(e);
  // }

  // private getRandomInt(max: number, min: number = 0): number {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }
  // // modal
  // showModal(): void {
  //   this.isVisible = true;
  // }

  // handleOk(): void {
  //   this.isVisible = false;
  // }

  // handleCancel(): void {
  //   this.isVisible = false;
  // }

  // // modal

  // /**
  //  *
  //  */
  // onChooseRental() {
   
  // }

  // onChooseRentalOption1(){
  //   combineLatest([
  //     this.store.select(selectData),
  //     this.store.select(selectRentalActualPrice),
  //     this.store.select(selectDepositActualPrice),
  //     this.store.select(selectQuantityRequest),
  //     this.store.select(selectNumberOfDays),
  //     this.rentalTimerService.rangePickerTime$,
  //   ])
  //     .pipe(
  //       tap(() => {
  //         this.ToasMS.showSuccess(
  //           'Bạn sẽ được chuyển hướng tới trang tạo đơn thuê!'
  //         );
  //       }),
  //       delay(1000)
  //     )
  //     .subscribe(
  //       ([
  //         productDetail,
  //         rentalActualPrice,
  //         depositActualPrice,
  //         quantityRequest,
  //         numberOfDay,
  //         datePickTime,
  //       ]) => {
  //         const processOrder: ProductRentalOrderProcess = {
  //           note: this.inputNote ?? '',
  //           numberOfDay,
  //           paymentMethod: 0,
  //           quantityRequest,
  //           productId: productDetail.id,
  //           rentalPriceRequest: rentalActualPrice,
  //           depositPriceRequest: depositActualPrice,
  //           productName: productDetail.productName,
  //           productImages: productDetail.productImages[0],
  //           timeEnd: datePickTime[0],
  //           timeStart: datePickTime[1],
  //         };
  //         this.storageService.set(
  //           LocalStorageKey.orderProcess,
  //           JSON.stringify(processOrder)
  //         );
  //         this.router.navigate(['/common/order-process']);
  //       }
  //     );
  // }
  
  // onChooseRentalOption2(){
  //   console.log('>>> line 162');
  // }

  // selectStateFromNgRx() {
  //   this.productRentalDetail$ = this.store.select(selectData);
  //   this.rentalPriceActual$ = this.store.select(selectRentalActualPrice);
  //   this.depositPriceActual$ = this.store.select(selectDepositActualPrice);
  //   this.rangePickerTime$ = this.rentalTimerService.rangePickerTime$;
  // }

  // dispatchActionNessarray() {}

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private rentalTimerService: RentalTimerService,
  //   private store: Store<FeatureAppState>,
  //   private storageService: StorageService,
  //   private ToasMS: MessageResponseService
  // ) {}

  // ngOnInit(): void {
  //   this.currentRoute = this.route.snapshot.paramMap.get("id") ?? '';
  //   this.dispatchActionNessarray();
  //   this.selectStateFromNgRx();

  //   this.rentalTimerService.timeStart$.subscribe((time) => {
  //     this.selectedTimeStart = time;
  //     console.log('object timeStart', time);
  //   });

  //   this.rentalTimerService.timeEnd$.subscribe((time) => {
  //     this.selectedTimeEnd = time;
  //     console.log('object timeEnd', time);
  //   });

  //   this.rentalTimerService.rentalDays$.subscribe((days) => {
  //     this.rentalDays = days;
  //   });

  //   //unsubscrib
  //   this.routeSubscription = this.router.events
  //     .pipe(filter((event) => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       this.rentalTimerService.clearState();
  //     });
  // }

  // ngOnDestroy(): void {
  //   if (this.routeSubscription) {
  //     this.routeSubscription.unsubscribe();
  //   }
  // }
}