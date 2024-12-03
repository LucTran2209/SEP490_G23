import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { filter, Observable, Subscription } from 'rxjs';
import { removeOneOrder, removeVoucher, resetRentalProduct } from '../../../../features/common/state/rental/rental.actions';
import { OrderState } from '../../../../features/common/state/rental/rental.reducers';
import {
  selectAllProductRental,
  selectCalcActualDiscountVoucher,
  selectTotalAllProductDepositPrice,
  selectTotalAllProductRentalPrice,
  selectVoucherAvaiable,
} from '../../../../features/common/state/rental/rental.selectors';
import { MessageResponseService } from '../../../../services/message-response.service';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { ConfimOrderProcessComponent } from '../../../modal/confim-order-process/confim-order-process.component';
import { PickerTimerComponent } from '../../../modal/picker-timer/picker-timer.component';
import { ListVoucherAvailableComponent } from '../../../modal/list-voucher-available/list-voucher-available.component';
import { VoucherDetailOutputDto } from '../../../../interfaces/voucher.interface';
import { IPayLoad } from '../../../../interfaces/account.interface';
import { LocalStorageKey } from '../../../../utils/constant';

@Component({
  selector: 'app-form-rental-product-v2',
  templateUrl: './form-rental-product-v2.component.html',
  styleUrl: './form-rental-product-v2.component.scss',
})
export class FormRentalProductV2Component implements OnInit, OnDestroy {
  isConfirmLoading = false;
  isVisible = false;
  inputValue?: string;
  userCurrent?: IPayLoad;
  productRentalDetailArray$?: Observable<OrderState[]>;
  depositPriceActual$?: Observable<string | number>;
  voucherAvaiable$?: Observable<VoucherDetailOutputDto | null>
  calcActualDiscountVoucher$?: Observable<number>;
  rentalPriceActualAll$?: Observable<string | number>;
  depositPriceActualAll$?: Observable<string | number>;
  //date time

  //subscription
  private routeSubscription?: Subscription;
  //date time
  private rentalModalRef: NzModalRef | null = null;
  private dateModalRef: NzModalRef | null = null;
  private voucherModalRef: NzModalRef | null = null;

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
        productRentalDetailArray$: this.productRentalDetailArray$
      },
    });
  }

  onChooseDateCustom() {
    this.dateModalRef =  this.modal.create({
      nzTitle: 'Thời gian',
      nzContent: PickerTimerComponent,
      nzFooter: null,
      nzWidth: 700,
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

onRemoveRow(pid: string | number){
this.store.dispatch(removeOneOrder({pid}))
}


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onClose(): void {
    this.store.dispatch(removeVoucher());
  }

  // on choose more
  onChooseRentalMore() {}

  selectStateFromNgRx() {
    this.voucherAvaiable$ = this.store.select(selectVoucherAvaiable);
    this.calcActualDiscountVoucher$ = this.store.select(selectCalcActualDiscountVoucher);
    this.rentalPriceActualAll$ = this.store.select(
      selectTotalAllProductRentalPrice
    );
    this.depositPriceActualAll$ = this.store.select(
      selectTotalAllProductDepositPrice
    );
    this.productRentalDetailArray$ = this.store.select(selectAllProductRental);
  }

  dispatchActionNessarray() {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalTimerService: RentalTimerService,
    private store: Store<FeatureAppState>,
    private storageService: StorageService,
    private toastMS: MessageResponseService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
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
    this.store.dispatch(resetRentalProduct());
  }
}
