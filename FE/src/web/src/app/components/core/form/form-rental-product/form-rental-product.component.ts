import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
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
  selectDepositActualPriceById,
  selectNumberOfDaysById,
  selectQuantityRequestById,
  selectRentalActualPriceById,
} from '../../../../features/common/state/rental/rental.selectors';
import { ProductItemResponse } from '../../../../interfaces/product.interface';
import { MessageResponseService } from '../../../../services/message-response.service';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { ConfimOrderProcessComponent } from '../../../modal/confim-order-process/confim-order-process.component';
import { PickerTimerComponent } from '../../../modal/picker-timer/picker-timer.component';

@Component({
  selector: 'app-form-rental-product',
  templateUrl: './form-rental-product.component.html',
  styleUrl: './form-rental-product.component.scss',
})
export class FormRentalProductComponent implements OnInit, OnDestroy {
  productIdParam?: string;
  isConfirmLoading = false;
  isVisible = false;
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

  handleOkOrderProcess(): void {
    console.log('Đã xác nhận đơn hàng!');
  }

  handleCancelProcess(): void {
    console.log('Đã hủy quá trình xác nhận đơn hàng!');
  }

  // modal

  /**
   *
   */
  onChooseRental(titleTemplate: TemplateRef<any>) {
    this.modal.create({
      nzTitle: titleTemplate,
      nzContent: ConfimOrderProcessComponent,
      nzFooter: null,
      nzWidth: 820,
      nzData: {
        productRentalDetail$: this.productRentalDetail$,
      },
    });
  }

  onChooseDateCustom() {
    this.modal.create({
      nzTitle: 'Thời gian',
      nzContent: PickerTimerComponent,
      nzFooter: null,
      nzWidth: 700,
    });
  }

  // modal

  selectStateFromNgRx() {
    this.productRentalDetail$ = this.store.select(selectData);
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
    private modal: NzModalService
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
