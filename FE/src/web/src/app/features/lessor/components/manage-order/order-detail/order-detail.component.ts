import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { map, Observable, Subscription } from 'rxjs';
import { ChangeStatusOrderComponent } from '../../../../../components/modal/change-status-order/change-status-order.component';
import { OrderListResponse } from '../../../../../interfaces/order.interface';
import { RentalTimerService } from '../../../../../services/rental-timer.service';
import { FeatureAppState } from '../../../../../store/app.state';
import { convertStatusOrder } from '../../../../../utils/anonymous.helper';
import { ORDER_STATUS } from '../../../../../utils/constant';
import {
  getOrderDetail,
  resetStateOrderDetail,
} from '../../../state/order-detail.actions';
import {
  selectOrderDetail,
  selectTotalQuantity,
} from '../../../state/order-detail.reducer';

interface IOrderDetail {
  nguoiThue: string;
  soDienThoai: string;
  email: string;
  ngayTao: string;
  thoiGianThue: string;
  maDonHang: string | number;
  quantityProduct: number | string;
  giaCoc: string;
  tongTien: string;
  trangThaiDonHang: string;
  trangThaiThanhToan: string;
  address: string;
}
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  allChecked = false;
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

  selectStateFromNgRx() {
    this.totalQuantity$ = this.store.select(selectTotalQuantity);
    this.orderDetail$ = this.store.select(selectOrderDetail);
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
    private store: Store<FeatureAppState>
  ) {}
}
