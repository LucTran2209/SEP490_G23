import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {
  combineLatest,
  concatMap,
  map,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { ChangeStatusOrderComponent } from '../../../../../components/modal/change-status-order/change-status-order.component';
import { OrderListResponse } from '../../../../../interfaces/order.interface';
import { RentalTimerService } from '../../../../../services/rental-timer.service';
import { FeatureAppState } from '../../../../../store/app.state';
import { convertButtonChangeStatusOrder, convertStatusOrder } from '../../../../../utils/anonymous.helper';
import { ORDER_STATUS, ORDER_STATUS_MAX } from '../../../../../utils/constant';


import { ConfirmDeleteRequestOrderComponent } from '../../../../../components/modal/confirm-delete-request-order/confirm-delete-request-order.component';
import { OrderService } from '../../../../../services/order.service';
import { MessageResponseService } from '../../../../../services/message-response.service';
import { selectOrderDetail, selectTotalQuantity } from '../../../state/_order/order-detail.reducer';
import { getOrderDetail, resetStateOrderDetail } from '../../../state/_order/order-detail.actions';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  allChecked = false;
  preventContinueChangeStatus: number = ORDER_STATUS_MAX;
  availableCancelRequestOrder: number[] = [
    ORDER_STATUS.PENDING_APPROVAL,
    ORDER_STATUS.PAYMENTED,
  ];
  avaiableAprroveRequestOrder: number[] = [
    ORDER_STATUS.PENDING_APPROVAL,
    ORDER_STATUS.PAYMENTED,
    ORDER_STATUS.DEPOSIT_REFUND,
  ]
  orderDetail$?: Observable<OrderListResponse | null>;
  totalQuantity$?: Observable<number | null>;
  private rentalModalRef: NzModalRef | null = null;
  subScription?: Subscription;
  onAllChecked(checked: boolean): void {}

  onItemChecked(): void {}

  convertRentalDay(startDate: string, endDate: string) {
    let diffDate_start = new Date(startDate);
    let diffDate_end = new Date(endDate);
    return this.timerCalculatorService.convertRentalDays([
      diffDate_start,
      diffDate_end,
    ]);
  }

  convertStatus(orderStatus: ORDER_STATUS) {
    return convertStatusOrder(orderStatus);
  }

  convertTextButton(orderStatus: ORDER_STATUS){
    return convertButtonChangeStatusOrder(orderStatus);
  }

  selectStateFromNgRx() {
    this.totalQuantity$ = this.store.select(selectTotalQuantity);
    this.orderDetail$ = this.store.select(selectOrderDetail);
  }
  getOrderStatusLatest(orderDetail: OrderListResponse): number {
    return orderDetail.orderStatuses.reduce(
      (max, item) => Math.max(max, item.status),
      -Infinity
    );
  }

  dispatchActionNessarray() {
    this.subScription = this.activateRoute.paramMap
      .pipe(
        map((p) => {
          const pid = p.get('id');
          if (pid) this.store.dispatch(getOrderDetail({ pid: pid }));
        })
      )
      .subscribe();
  }

  popUpChangeStatus(titleTpl: TemplateRef<any>) {
    this.rentalModalRef = this.modalService.create({
      nzTitle: titleTpl,
      nzContent: ChangeStatusOrderComponent,
      nzFooter: null,
      nzBodyStyle: { padding: '12px' },
      nzData: {
        orderDetail$: this.orderDetail$,
      },
    });

    if (this.rentalModalRef)
      this.rentalModalRef.afterClose.subscribe((result) => {
        if (result === 'updated') {
          this.rentalModalRef = null;
        }
      });
  }

  popUpCancelOrderStatus() {
    this.rentalModalRef = this.modalService.create({
      nzContent: ConfirmDeleteRequestOrderComponent,
      nzCloseIcon: '',
      nzFooter: null,
      nzBodyStyle: { padding: '12px' },
    });

    const instance = this.rentalModalRef.getContentComponent();
    instance.noteReasonCancel.subscribe((noteMessage: string) => {
      combineLatest([ this.activateRoute.paramMap])
        .pipe(
          concatMap(([p]) => {
            const pid = p.get('id');
            const formData = new FormData();
            formData.append('Id', '');
            formData.append('OrderId', `${pid}`);
            formData.append('Message', `${noteMessage}`);
            formData.append('Status', `${ORDER_STATUS.CANCEL}`);
            formData.append('FileAttach', '');
            return this.orderService.requestOrderStatus(formData);
          }),
          tap(() => {
            this.dispatchActionNessarray();
          })
        )
        .subscribe({
          next: () => {
            this.messageResponseMS.showInfo(
              'Sẽ thông báo đơn hàng hủy tới bên thuê'
            );
          },
          error: (err) => {
            console.error('Lỗi xử lý:', err);
          },
        });
    });
  }

  ngOnInit(): void {
    this.dispatchActionNessarray();
    this.selectStateFromNgRx();
    console.log('Oninit call');
  }

  ngOnDestroy(): void {
    console.log('OnDestroy call');
    this.subScription?.unsubscribe();
    this.store.dispatch(resetStateOrderDetail());
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private timerCalculatorService: RentalTimerService,
    private modalService: NzModalService,
    private store: Store<FeatureAppState>,
    private orderService: OrderService,
    private messageResponseMS: MessageResponseService
  ) {}
}
