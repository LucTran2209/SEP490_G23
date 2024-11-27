import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import {
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { createOrder } from '../../../features/common/state/order/order.actions';
import { OrderState } from '../../../features/common/state/rental/rental.reducers';
import {
  selectAllProductRental,
  selectCalcActualRentalPriceAfterSubtractVouncer,
  selectTotalAllProductDepositPrice,
  selectTotalAllProductRentalPrice,
  selectVoucherAvaiable,
} from '../../../features/common/state/rental/rental.selectors';
import { IPayLoad } from '../../../interfaces/account.interface';
import { OrderCreateRequest } from '../../../interfaces/order.interface';
import { ProductItemResponse } from '../../../interfaces/product.interface';
import { MessageResponseService } from '../../../services/message-response.service';
import { OrderService } from '../../../services/order.service';
import { RentalTimerService } from '../../../services/rental-timer.service';
import { StorageService } from '../../../services/storage.service';
import { FeatureAppState } from '../../../store/app.state';
import { LocalStorageKey } from '../../../utils/constant';
import { MyValidators } from '../../../utils/validators';
import { convertToLocalISOString } from '../../../utils/timer.helper';
import { VoucherDetailOutputDto } from '../../../interfaces/voucher.interface';

@Component({
  selector: 'app-confim-order-process',
  templateUrl: './confim-order-process.component.html',
  styleUrl: './confim-order-process.component.scss',
})
export class ConfimOrderProcessComponent implements OnInit, OnDestroy {
  userCurrent?: IPayLoad;
  nzModalData: any = inject(NZ_MODAL_DATA);
  productRentalDetail$?: Observable<ProductItemResponse>;
  productRentalDetailArray$?: Observable<OrderState[]>;
  //date time
  rangePickerTime$?: Observable<Date[]>;
  selectedTimeStart$?: Observable<any>;
  selectedTimeEnd$?: Observable<any>;
  rentalDays$?: Observable<number>;
  //date time
  //form
  infoOrderCommonForm: FormGroup<{
    recipientName: FormControl<string>;
    recipientPhoneNumber: FormControl<string>;
    recipientEmail: FormControl<string>;
    recipientAddress: FormControl<string>;
    note: FormControl<string>;
  }>;

  // config autoTip
  autoTips: Record<string, Record<string, string>> = {
    en: {
      required: 'Trường nhập là bắt buộc',
    },
  };
  // config autoTip
  //form
  // radio
  parentSelectedValue: string = '';
  listFiles?: File[];
  // radio
  //subscription
  private createOrderSubscription?: Subscription;
  //subscription

  initForm(): FormGroup {
    return (this.infoOrderCommonForm = this.formbuilder.group({
      recipientName: [
        '',
        [
          MyValidators.required,
          MyValidators.minLength(3),
          MyValidators.maxLength(20),
        ],
      ],
      recipientPhoneNumber: ['', [MyValidators.required, MyValidators.mobile]],
      recipientAddress: ['', [MyValidators.required]],
      recipientEmail: ['', [ MyValidators.email]],
      note: [''],
    }) as FormGroup<{
      recipientName: FormControl<string>;
      recipientPhoneNumber: FormControl<string>;
      recipientEmail: FormControl<string>;
      recipientAddress: FormControl<string>;
      note: FormControl<string>;
    }>);
  }

  onOkClick(): void {
    if (!this.userCurrent) {
      this.toastMS.handleError('Bạn cần đăng nhập để tạo đơn thuê!', 401);
      this.router.navigateByUrl('/auth/login');
      this.modalRef.triggerOk();
      return;
    }
    if (this.infoOrderCommonForm.valid) {
      this.mergeAllDataReq();
      this.modalRef.triggerOk();
    } else {
      Object.values(this.infoOrderCommonForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  mergeAllDataReq(): void {
    debugger;
    this.createOrderSubscription = combineLatest([
      this.store.select(selectAllProductRental),
      this.store.select(selectTotalAllProductDepositPrice()),
      this.store.select(selectCalcActualRentalPriceAfterSubtractVouncer),
      this.rentalTimerService.rangePickerTime$,
      of(this.userCurrent),
      of(this.infoOrderCommonForm),
      of(this.listFiles),
      this.store.select(selectVoucherAvaiable)
    ])
      .pipe(
        map(
          ([
            rentalProductAll,
            rentalPriceAll,
            depositPriceAll,
            datePickTime,
            userCurrent,
            infoOrderCommonForm,
            listFiles,
            voucherAvaiable
          ]) => {
            if (
              rentalProductAll &&
              rentalPriceAll !== null &&
              depositPriceAll !== null &&
              datePickTime &&
              userCurrent &&
              infoOrderCommonForm?.valid &&
              listFiles?.length !== 0
            ) {
              return [
                rentalProductAll,
                rentalPriceAll,
                depositPriceAll,
                datePickTime,
                userCurrent,
                infoOrderCommonForm,
                listFiles,
                voucherAvaiable
              ];
            } else {
              return null;
            }
          }
        ),
        filter(
          (
            result
          ): result is [
            OrderState[],
            number,
            number,
            Date[],
            IPayLoad,
            FormGroup,
            File[],
            VoucherDetailOutputDto
          ] => result !== null
        ),
        catchError((error) => {
          console.error('error create order', error.message);
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res) {
          const formData = new FormData();
          const formValues = res[5].value;
          const orderDetailsJson = JSON.stringify(res[0].map((item) => ({
            id: null as string | null,
            productId: item.productId.toString(),
            orderId: null as string | null,
            quantity: Number(item.quantityRequest),
          })));
          console.log('orderDetailsJson', orderDetailsJson);
          const orderCreateRequest: OrderCreateRequest = {
            userId: res[4].UserId || '',
            note: formValues.note,
            recipientAddress: formValues.recipientAddress,
            recipientEmail: formValues.recipientEmail,
            recipientName: formValues.recipientName,
            recipientPhoneNumber: formValues.recipientPhoneNumber,
            orderDetails: "",
            orderDetailsJson: orderDetailsJson,
            voucherId: String(res[7].id),
            totalDepositPrice: Number(res[1]),
            totalRentPrice: Number(res[2]),
            startDate: convertToLocalISOString(res[3][0]) ,
            endDate: convertToLocalISOString(res[3][1]),
            mortgagePaperType: this.parentSelectedValue,
            mortgagePaperImageFont: res[6][0],
            mortgagePaperImageBack: res[6][1],
          };

          Object.entries(orderCreateRequest).forEach(([key, value]) => {
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            if (
              capitalizedKey === 'MortgagePaperImageFont' ||
              capitalizedKey === 'MortgagePaperImageBack' || 
              capitalizedKey === 'OrderDetailsJson'
            ) {
              formData.append(capitalizedKey, value);
            } else {
              formData.append(capitalizedKey, value as string);
            }
          });
          this.store.dispatch(createOrder({ formData }));
        }
      });
  }

  onCancelClick(): void {
    this.modalRef.triggerCancel();
  }

  onSelectCollateral(val: string): void {
    console.log('Selected Collateral:', val);
  }

  handleFileList(files: File[]): void {
    this.listFiles = files;
  }

  constructor(
    private modalRef: NzModalRef,
    private rentalTimerService: RentalTimerService,
    private orderService: OrderService,
    private formbuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private toastMS: MessageResponseService,
    private store: Store<FeatureAppState>
  ) {
    this.infoOrderCommonForm = this.initForm();
  }
  ngOnInit(): void {
    this.productRentalDetail$ = this.nzModalData.productRentalDetail$;
    this.productRentalDetailArray$ = this.nzModalData.productRentalDetailArray$;
    this.rangePickerTime$ = this.rentalTimerService.rangePickerTime$;
    this.selectedTimeStart$ = this.rentalTimerService.timeStart$;
    this.selectedTimeEnd$ = this.rentalTimerService.timeEnd$;
    this.rentalDays$ = this.rentalTimerService.rentalDays$;
    this.userCurrent = this.storageService.get(LocalStorageKey.currentUser)
      ? (JSON.parse(
          this.storageService.get(LocalStorageKey.currentUser)!
        ) as IPayLoad)
      : undefined;
  }

  ngOnDestroy(): void {
    if(this.createOrderSubscription){
      this.createOrderSubscription.unsubscribe();
    }
  }
}
