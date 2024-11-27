import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { filter, Observable, Subscription } from 'rxjs';
import { selectData } from '../../../../features/common/state/product/product-detail.reducer';
import {
  selectCalcActualDiscountVoucher,
  selectDepositActualPriceById,
  selectNumberOfDaysById,
  selectRentalActualPriceById,
  selectVoucherAvaiable,
} from '../../../../features/common/state/rental/rental.selectors';
import { ProductItemResponse } from '../../../../interfaces/product.interface';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { FeatureAppState } from '../../../../store/app.state';
import { ConfimOrderProcessComponent } from '../../../modal/confim-order-process/confim-order-process.component';
import { PickerTimerComponent } from '../../../modal/picker-timer/picker-timer.component';
import { IPayLoad } from '../../../../interfaces/account.interface';
import { MessageResponseService } from '../../../../services/message-response.service';
import { LocalStorageKey } from '../../../../utils/constant';
import { StorageService } from '../../../../services/storage.service';
import { ListVoucherAvailableComponent } from '../../../modal/list-voucher-available/list-voucher-available.component';
import { removeVoucher } from '../../../../features/common/state/rental/rental.actions';
import { VoucherDetailOutputDto } from '../../../../interfaces/voucher.interface';

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
  userCurrent?: IPayLoad;
  rentalPriceActual$?: Observable<string | number>;
  numberDay$?: Observable<string | number | undefined>;
  depositPriceActual$?: Observable<string | number>;
  voucherAvaiable$?: Observable<VoucherDetailOutputDto | null>
  calcActualDiscountVoucher$?: Observable<number>;
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

  // modal Ref
  private rentalModalRef: NzModalRef | null = null;
  private dateModalRef: NzModalRef | null = null;
  private voucherModalRef: NzModalRef | null = null;
  // modal Ref
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
    if (!this.userCurrent) {
      this.toastMS.handleError('Bạn cần đăng nhập để tạo đơn thuê!', 401);
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.rentalModalRef = this.modal.create({
      nzTitle: titleTemplate,
      nzContent: ConfimOrderProcessComponent,
      nzFooter: null,
      nzWidth: 820,
      nzData: {
        productRentalDetail$: this.productRentalDetail$,
      },
    });

    if (this.rentalModalRef)
      this.rentalModalRef.afterClose.subscribe(() => {
        this.rentalModalRef = null;
      });
  }

  onChooseDateCustom() {
    this.dateModalRef = this.modal.create({
      nzTitle: 'Thời gian',
      nzContent: PickerTimerComponent,
      nzFooter: null,
      nzWidth: 700,
    });

    if (this.dateModalRef)
      this.dateModalRef.afterClose.subscribe(() => {
        this.dateModalRef = null;
      });
  }


  openAvaiableVoucher(){
    this.voucherModalRef = this.modal.create({
      nzTitle: 'Mã khuyến mãi',
      nzContent: ListVoucherAvailableComponent,
      nzFooter: null,
      nzWidth: 500,
    })
    if (this.voucherModalRef)
      this.voucherModalRef.afterClose.subscribe(() => {
        this.voucherModalRef = null;
      });
  }
  // modal


  onClose(): void {
    this.store.dispatch(removeVoucher());
  }


  selectStateFromNgRx() {
    this.productRentalDetail$ = this.store.select(selectData);
    this.voucherAvaiable$ = this.store.select(selectVoucherAvaiable);
    this.calcActualDiscountVoucher$ = this.store.select(selectCalcActualDiscountVoucher);
    if (this.productIdParam) {
      this.rentalPriceActual$ = this.store
        .select(selectRentalActualPriceById(this.productIdParam))
        .pipe(filter((value): value is string | number => value !== undefined));

      this.depositPriceActual$ = this.store
        .select(selectDepositActualPriceById(this.productIdParam))
        .pipe(filter((value): value is string | number => value !== undefined));

      this.numberDay$ = this.store.select(
        selectNumberOfDaysById(String(this.productIdParam))
      );
    }
  }

  dispatchActionNessarray() {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalTimerService: RentalTimerService,
    private store: Store<FeatureAppState>,
    private modal: NzModalService,
    private toastMS: MessageResponseService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.productIdParam = this.route.snapshot.paramMap.get('id') ?? '';
    this.userCurrent = this.storageService.get(LocalStorageKey.currentUser)
      ? (JSON.parse(
          this.storageService.get(LocalStorageKey.currentUser)!
        ) as IPayLoad)
      : undefined;
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
