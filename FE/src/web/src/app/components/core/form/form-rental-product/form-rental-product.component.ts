import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  delay,
  filter,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { selectData } from '../../../../features/common/state/product/product-detail.reducer';
import {
  ProductItemResponse,
  ProductRentalOrderProcess,
} from '../../../../interfaces/product.interface';
import { MessageResponseService } from '../../../../services/message-response.service';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { LocalStorageKey } from '../../../../utils/constant';
import {
  selectDepositActualPriceById,
  selectNumberOfDaysById,
  selectQuantityRequestById,
  selectRentalActualPriceById,
} from '../../../../features/common/state/rental/rental.selectors';
interface IProductShortSearch {
  id: string | number;
  productName: string;
  rentalPrice: number;
  depositPrice: number;
  rentalLimitDays: number;
  images: string;
}

@Component({
  selector: 'app-form-rental-product',
  templateUrl: './form-rental-product.component.html',
  styleUrl: './form-rental-product.component.scss',
})
export class FormRentalProductComponent implements OnInit, OnDestroy {
  productIdParam?: string;
  isConfirmLoading = false;
  isVisible = false;
  inputNote?: string;
  options: Array<IProductShortSearch> = [];
  productRentalDetail$?: Observable<ProductItemResponse>;

  rentalPriceActual$?: Observable<string | number>;
  depositPriceActual$?: Observable<string | number>;
  //ngRx

  //ngRx

  //date time
  rangePickerTime$?: Observable<Date[]>;
  selectedTimeStart$?: Observable<any>;
  selectedTimeEnd$?: Observable<any>;
  rentalDays$?: Observable<number>;
  //date time

  //subscription
  private routeSubscription?: Subscription;

  // modal
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  // modal

  /**
   *
   */
  onChooseRental() {
    if (this.productIdParam) {
      combineLatest([
        this.store.select(selectData),
        this.store.select(selectRentalActualPriceById(this.productIdParam)),
        this.store.select(selectDepositActualPriceById(this.productIdParam)),
        this.store.select(selectQuantityRequestById(this.productIdParam)),
        this.store.select(selectNumberOfDaysById(this.productIdParam)),
        this.rentalTimerService.rangePickerTime$,
      ])
        .pipe(
          tap(() => {
            this.ToasMS.showSuccess(
              'Bạn sẽ được chuyển hướng tới trang tạo đơn thuê!'
            );
          }),
          delay(1000)
        )
        .subscribe(
          ([
            productDetail,
            rentalActualPrice,
            depositActualPrice,
            quantityRequest,
            numberOfDay,
            datePickTime,
          ]) => {
            if (
              productDetail &&
              rentalActualPrice &&
              depositActualPrice &&
              quantityRequest &&
              numberOfDay &&
              datePickTime
            ) {
              const processOrder: ProductRentalOrderProcess = {
                note: this.inputNote ?? '',
                numberOfDay: numberOfDay,
                paymentMethod: 0,
                quantityRequest: Number(quantityRequest),
                productId: productDetail.id,
                rentalPriceRequest: Number(rentalActualPrice),
                depositPriceRequest: Number(depositActualPrice),
                productName: productDetail.productName,
                productImages: productDetail.productImages[0],
                timeEnd: datePickTime[0],
                timeStart: datePickTime[1],
              };
              this.storageService.set(
                LocalStorageKey.orderProcess,
                JSON.stringify(processOrder)
              );
              this.router.navigate(['/common/order-process']);
            }
          }
        );
    }
  }

  selectStateFromNgRx() {
    this.productRentalDetail$ = this.store.select(selectData);
    this.rangePickerTime$ = this.rentalTimerService.rangePickerTime$;
    this.selectedTimeStart$ = this.rentalTimerService.timeStart$;
    this.selectedTimeEnd$ = this.rentalTimerService.timeEnd$;
    this.rentalDays$ = this.rentalTimerService.rentalDays$;
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
