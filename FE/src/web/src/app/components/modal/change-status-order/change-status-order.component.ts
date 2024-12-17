import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import {
  combineLatest,
  concatMap,
  filter,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { getOrderDetail } from '../../../features/lessor/state/_order/order-detail.actions';
import { OrderListResponse } from '../../../interfaces/order.interface';
import { MessageResponseService } from '../../../services/message-response.service';
import { OrderService } from '../../../services/order.service';
import { FeatureAppState } from '../../../store/app.state';
import { convertStatusOrder } from '../../../utils/anonymous.helper';
import { ORDER_STATUS, USER_ROLE } from '../../../utils/constant';
@Component({
  selector: 'app-change-status-order',
  templateUrl: './change-status-order.component.html',
  styleUrl: './change-status-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeStatusOrderComponent implements OnInit, OnDestroy {
  nzModalData: any = inject(NZ_MODAL_DATA);
  orderDetail$?: Observable<OrderListResponse>;
  selectedValue: FormControl<string | number | null> = new FormControl<
    string | number | null
  >(null, [Validators.required]);
  isMultiple: boolean = false;
  subScription?: Subscription;
  noteMessage: FormControl<string | null> = new FormControl<string | null>('');
  uploadedFiles: File[] = [];
  filePreviews: string[] = [];
  convertStatus(orderStatus: ORDER_STATUS) {
    return convertStatusOrder(orderStatus, USER_ROLE.LESSOR);
  }

  confirm(action: 'approve' | 'reject' | 'cancel'): void {
    if (action === 'cancel' || action === 'reject') {
      this.modalRef.triggerOk();
      return;
    }
    this.isNeedFileEvidence
      ?.pipe(
        switchMap((isNeed) => {
          if (isNeed && this.uploadedFiles.length === 0) {
            this.messageResponseMS.handleError('Vui lòng đính kèm file trước!');
            return of(false);
          } else {
            return of(true);
          }
        }),
        filter((canProceed) => canProceed)
      )
      .subscribe(() => {
        if (this.orderDetail$ && this.selectedValue.valid) {
          combineLatest([
            this.orderDetail$,
            of(this.selectedValue.value),
            of(this.noteMessage.value),
            of(this.uploadedFiles),
          ])
            .pipe(
              concatMap(([order, selectStatus, noteMessage, uploadedFiles]) => {
                let fileAttach =
                  uploadedFiles.length === 0 ? '' : uploadedFiles[0];
                const formData = new FormData();
                formData.append('Id', '');
                formData.append('OrderId', `${order.id}`);
                formData.append('Message', `${noteMessage}`);
                formData.append('Status', `${selectStatus}`);
                formData.append('FileAttach', fileAttach);
                return this.orderService.requestOrderStatus(formData).pipe(
                  map((res) => ({
                    orderId: order.id,
                    res,
                  }))
                );
              }),
              tap(({ orderId }) => {
                this.dispatchActionNessarray(orderId);
              })
            )
            .subscribe({
              next: (result) => {
                if (result.res.data === 'NotEnough') {
                  this.messageResponseMS.showPreventAccess(
                    result.res.message,
                    ''
                  );
                } else {
                  this.messageResponseMS.showSuccess(
                    'Cập nhật trạng thái thành công'
                  );
                }
                this.selectedValue.reset();
              },
            });
        }
        this.modalRef.triggerOk();
      });
  }

  dispatchActionNessarray(pid: string) {
    this.store.dispatch(getOrderDetail({ pid: pid }));
  }

  getOrderStatusLatest(orderDetail: OrderListResponse): number {
    const val = orderDetail.orderStatuses.reduce(
      (max, item) => Math.max(max, item.status),
      -Infinity
    );
    this.selectedValue.setValue(val + 1);
    return val;
  }

  get isNeedFileEvidence() {
    return this.orderDetail$?.pipe(
      switchMap((orderDetail) => {
        if (this.getOrderStatusLatest(orderDetail) === ORDER_STATUS.PAYMENTED) {
          return of(true);
        }
        return of(false);
      })
    );
  }
  get isCanViewFileEvidence() {
    return this.orderDetail$?.pipe(
      switchMap((orderDetail) => {
        if (
          this.getOrderStatusLatest(orderDetail) === ORDER_STATUS.DEPOSIT_REFUND
        ) {
          return of(true);
        }
        return of(false);
      })
    );
  }

  getOrderStatusLatestFileAttach(orderDetail: OrderListResponse) {
    const val = orderDetail.orderStatuses.reduce((max, item) => {
      return item.status > max.status ? item : max;
    }, orderDetail.orderStatuses[0]);
    return val.fileAttach;
  }
  onRemoveAFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  onSelectedFile(files: File[]): void {
    this.uploadedFiles = files;
    this.filePreviews = [];
    this.generateFilePreviews(files);
    this.cdRef.detectChanges();
  }

  generateFilePreviews(files: File[]): void {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreviews.push(e.target.result);
        this.cdRef.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

  constructor(
    private modalRef: NzModalRef,
    private store: Store<FeatureAppState>,
    private orderService: OrderService,
    private messageResponseMS: MessageResponseService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.orderDetail$ = this.nzModalData.orderDetail$;
  }
  ngOnDestroy(): void {}
}
