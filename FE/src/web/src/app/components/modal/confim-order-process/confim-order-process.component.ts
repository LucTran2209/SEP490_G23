import { Component, inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import {
  catchError,
  combineLatest,
  delay,
  filter,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { ProductItemResponse } from '../../../interfaces/product.interface';
import { RentalTimerService } from '../../../services/rental-timer.service';
import { OrderService } from '../../../services/order.service';
import { OrderState } from '../../../features/common/state/rental/rental.reducers';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageKey, REGEX } from '../../../utils/constant';
import { MyValidators } from '../../../utils/validators';
import { IPayLoad } from '../../../interfaces/account.interface';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
import { MessageResponseService } from '../../../services/message-response.service';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../../../store/app.state';
import {
  selectAllProductRental,
  selectTotalAllProductDepositPrice,
  selectTotalAllProductRentalPrice,
} from '../../../features/common/state/rental/rental.selectors';
import { OrderCreateRequest } from '../../../interfaces/order.interface';
import { generateCodeOrder } from '../../../utils/anonymous.helper';

@Component({
  selector: 'app-confim-order-process',
  templateUrl: './confim-order-process.component.html',
  styleUrl: './confim-order-process.component.scss',
})
export class ConfimOrderProcessComponent implements OnInit {
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
  userCurrent?: IPayLoad;

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
      recipientEmail: ['', [MyValidators.required, MyValidators.email]],
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
      console.log('on r');
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
    // callAPI
    // if (this.productIdParam) {
    //   combineLatest([
    //     this.store.select(selectData),
    //     this.store.select(selectRentalActualPriceById(this.productIdParam)),
    //     this.store.select(selectDepositActualPriceById(this.productIdParam)),
    //     this.store.select(selectQuantityRequestById(this.productIdParam)),
    //     this.store.select(selectNumberOfDaysById(this.productIdParam)),
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
    //         if (
    //           productDetail &&
    //           rentalActualPrice &&
    //           depositActualPrice &&
    //           quantityRequest &&
    //           numberOfDay &&
    //           datePickTime
    //         ) {
    //           const processOrder: any = {
    //             numberOfDay: numberOfDay,
    //             quantityRequest: Number(quantityRequest),
    //             productId: productDetail.id,
    //             rentalPriceRequest: Number(rentalActualPrice),
    //             depositPriceRequest: Number(depositActualPrice),
    //             productName: productDetail.productName,
    //             timeEnd: datePickTime[0],
    //             timeStart: datePickTime[1],
    //             images: productDetail.images
    //           };

    //           console.log('>>>> line 134', processOrder);
    //         }
    //       }
    //     );
    // }
  }

  mergeAllDataReq(): any {
    combineLatest([
      this.store.select(selectAllProductRental),
      this.store.select(selectTotalAllProductDepositPrice()),
      this.store.select(selectTotalAllProductRentalPrice()),
      this.rentalTimerService.rangePickerTime$,
      of(this.userCurrent),
      of(this.infoOrderCommonForm),
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
          ]) => {
            if (
              rentalProductAll &&
              rentalPriceAll !== null &&
              depositPriceAll !== null &&
              datePickTime &&
              userCurrent &&
              infoOrderCommonForm?.valid
            ) {
              return [
                rentalProductAll,
                rentalPriceAll,
                depositPriceAll,
                datePickTime,
                userCurrent,
                infoOrderCommonForm,
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
            FormGroup
          ] => result !== null
        ),
        tap(() => {
          console.log('tạo đơn 162');
        }),
        catchError((error) => {
          console.error('error create order', error.message);
          return of(null);
        })
      )
      .subscribe((res) => {
        console.log('wer', res);
        if (res) {
          let orderDetails = res?.[0].map((item) => ({
            id: null,
            productId: item.productId.toString(),
            orderId: null,
            quantity: Number(item.quantityRequest),
          }));

          let reqCreateOrder: OrderCreateRequest = {
            id: null,
            userId: res?.[4].UserId,
            voucherId: null,
            code: generateCodeOrder(),
            recipientAddress: res[5].get('recipientAddress')?.value,
            recipientEmail: res[5].get('recipientEmail')?.value,
            recipientName: res[5].get('recipientName')?.value,
            recipientPhoneNumber: res[5].get('recipientPhoneNumber')?.value,
            note: res[5].get('note')?.value,
            paymentType: 0,
            endDate: res[3][0].toString(),
            startDate: res[3][1].toString(),
            totalDepositPrice: res[2],
            totalRentPrice: res[1],
            orderDetails
          };

          console.log('>>> line 258', reqCreateOrder);
        }
      });
  }

  onCancelClick(): void {
    this.modalRef.triggerCancel();
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
    this.userCurrent = JSON.parse(
      this.storageService.get(LocalStorageKey.currentUser) || ''
    ) as IPayLoad;
  }
}
