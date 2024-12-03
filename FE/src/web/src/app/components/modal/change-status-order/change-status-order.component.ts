import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import {
  combineLatest,
  concatMap,
  map,
  Observable,
  of,
  Subscription,
  tap
} from 'rxjs';
import { OptionSelect } from '../../../configs/anonymous.config';
import { getOrderDetail } from '../../../features/lessor/state/_order/order-detail.actions';
import { OrderListResponse } from '../../../interfaces/order.interface';
import { MessageResponseService } from '../../../services/message-response.service';
import { OrderService } from '../../../services/order.service';
import { FeatureAppState } from '../../../store/app.state';
import { convertStatusOrder } from '../../../utils/anonymous.helper';
import { ORDER_STATUS } from '../../../utils/constant';
type TypeSelectOrderStatus = OptionSelect & { statusType: ORDER_STATUS };
@Component({
  selector: 'app-change-status-order',
  templateUrl: './change-status-order.component.html',
  styleUrl: './change-status-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeStatusOrderComponent implements OnInit, OnDestroy {
  nzModalData: any = inject(NZ_MODAL_DATA);
  orderDetail$?: Observable<OrderListResponse>;
  selectedValue: FormControl<string | number | null> = new FormControl<
    string | number | null
  >(null, [Validators.required]);
  subScription?: Subscription;
  noteMessage: FormControl<string | null> = new FormControl<string | null>('');

  convertStatus(orderStatus: ORDER_STATUS) {
    return convertStatusOrder(orderStatus);
  }

  confirm(action: 'approve' | 'reject' | 'cancel'): void {
    if (action === 'cancel' || action === 'reject') {
      this.modalRef.triggerOk();
      return;
    }
    console.log(this.selectedValue.value, 'line 85');
    if (this.orderDetail$ && this.selectedValue.valid) {
      combineLatest([
        this.orderDetail$,
        of(this.selectedValue.value),
        of(this.noteMessage.value),
      ]).pipe(
        concatMap(([order, selectStatus, noteMessage]) => {
          const formData = new FormData();
          formData.append('Id', '');
          formData.append('OrderId', `${order.id}`);
          formData.append('Message', `${noteMessage}`);
           formData.append('Status', `${selectStatus}`);
          formData.append('FileAttach', '');
          return this.orderService.requestOrderStatus(formData).pipe(
            map(() => ({
              orderId: order.id, 
            }))
          );
        }),
        tap(({orderId }) => {
          this.dispatchActionNessarray(orderId);
        })
      ).subscribe({
        next: () => {
          this.messageResponseMS.showSuccess('Cập nhật trạng thái thành công');
          this.selectedValue.reset();
        },
      });
    }
    this.modalRef.triggerOk();
  }

  dispatchActionNessarray(pid: string) {
    this.store.dispatch(getOrderDetail({ pid: pid }));
  }

  getOrderStatusLatest(orderDetail: OrderListResponse): number{
     const val = orderDetail.orderStatuses.reduce((max, item) => Math.max(max, item.status), -Infinity);
     this.selectedValue.setValue(val + 1);
     return val;
  }


  constructor(
    private modalRef: NzModalRef,
    private store: Store<FeatureAppState>,
    private orderService: OrderService,
    private messageResponseMS: MessageResponseService
  ) {}

  ngOnInit(): void {
    this.orderDetail$ = this.nzModalData.orderDetail$;
  }
  ngOnDestroy(): void {}
}
