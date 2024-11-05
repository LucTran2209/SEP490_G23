import { Component, inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ProductItemResponse } from '../../../interfaces/product.interface';
import { RentalTimerService } from '../../../services/rental-timer.service';
import { OrderService } from '../../../services/order.service';
import { OrderState } from '../../../features/common/state/rental/rental.reducers';

@Component({
  selector: 'app-confim-order-process',
  templateUrl: './confim-order-process.component.html',
  styleUrl: './confim-order-process.component.scss',
})
export class ConfimOrderProcessComponent implements OnInit {
  nzModalData: any = inject(NZ_MODAL_DATA);
  inputNote: string = '';
 productRentalDetail$?: Observable<ProductItemResponse>;
 productRentalDetailArray$?: Observable<OrderState[]>
  //date time
  rangePickerTime$?: Observable<Date[]>;
  selectedTimeStart$?: Observable<any>;
  selectedTimeEnd$?: Observable<any>;
  rentalDays$?: Observable<number>;
  //date time
  onOkClick(): void {
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
    this.modalRef.triggerOk();
  }

  onCancelClick(): void {
    this.modalRef.triggerCancel();
  }

  constructor(private modalRef: NzModalRef, private rentalTimerService: RentalTimerService, private orderService: OrderService) {}
  ngOnInit(): void {
    this.productRentalDetail$ = this.nzModalData.productRentalDetail$;
   this.productRentalDetailArray$ = this.nzModalData.productRentalDetailArray$;
    this.rangePickerTime$ = this.rentalTimerService.rangePickerTime$;
    this.selectedTimeStart$ = this.rentalTimerService.timeStart$;
    this.selectedTimeEnd$ = this.rentalTimerService.timeEnd$;
    this.rentalDays$ = this.rentalTimerService.rentalDays$;
  }
}
