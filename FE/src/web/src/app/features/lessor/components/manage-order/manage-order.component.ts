import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import dayjs from 'dayjs';
import { NzCustomColumn } from 'ng-zorro-antd/table';
import { map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { OptionSelectCheckBox } from '../../../../configs/anonymous.config';
import { OrderListResponse } from '../../../../interfaces/order.interface';
import { LoadingService } from '../../../../services/loading.service';
import { NavigationService } from '../../../../services/navigation.service';
import { OrderService } from '../../../../services/order.service';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { convertStatusOrder } from '../../../../utils/anonymous.helper';
import { ORDER_STATUS } from '../../../../utils/constant';

export interface CustomColumns extends NzCustomColumn {
  name: string;
  position?: 'left' | 'right';
}

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss',
})
export class ManageOrderComponent implements OnInit, OnDestroy {
  listData: OrderListResponse[] = [];
  pageIndex$: Observable<number> = of(1);
  pageTotal$?: Observable<number>;
  pageSize$: Observable<number> = of(10);
  customColumn: CustomColumns[] = [
    {
      name: 'Mã đơn hàng',
      value: 'maDonHang',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Ngày tạo',
      value: 'ngayTao',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Người thuê',
      value: 'nguoiThue',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Số điện thoại',
      value: 'soDienThoai',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Thời gian thuê',
      value: 'thoiGianThue',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Giá cọc',
      value: 'giaCoc',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Tổng tiền',
      value: 'tongTien',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Nội dung',
      value: 'noiDung',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Trạng thái đơn hàng',
      value: 'trangThaiDonHang',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Trạng thái thanh toán',
      value: 'trangThaiThanhToan',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
  ];

  subscription?: Subscription;

  handleChooseViewCell(arr: OptionSelectCheckBox[]) {
    this.customColumn = this.customColumn.map((item, index) => ({
      ...item,
      default: arr[index].checked,
    }));
  }

  getOrderStatusLatest(orderDetail: OrderListResponse): number {
    return orderDetail.orderStatuses.reduce(
      (max, item) => Math.max(max, item.status),
      -Infinity
    );
  }

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

  onSelectDetail(val: OrderListResponse) {
    console.log('data', val);
    this.router.navigateByUrl(`lessor/order/${val.id}`);
  }

  onSubmitForm(valGroup: any) {
    const { orderCode, orderStatus, humanRental, phoneNumber, timeRange } =
      valGroup;
    const startDate =
      timeRange && timeRange.length !== 0
        ? dayjs(timeRange[0]).format('YYYY-MM-DD')
        : null;
    const endDate =
      timeRange && timeRange.length !== 0
        ? dayjs(timeRange[1]).format('YYYY-MM-DD')
        : null;
    this.onloadOrder({
      pageIndex: 1,
      pageSize: 10,
      orderCode,
      status: orderStatus,
      phoneNumber,
      renterName: humanRental,
      startDate,
      endDate,
    });

    this.navigateService.updateParams({
      pageIndex: 1,
      pageSize: 10,
      orderStatus,
      phoneNumber,
      humanRental,
    });
  }

  onPageSizeChange(newPageSize: number) {
    this.onloadOrder({
      pageSize: newPageSize,
    });
    this.navigateService.updateParams({
      pageIndex: newPageSize,
    });
  }

  onPageIndexChange(newPageIndex: number) {
    this.onloadOrder({
      pageIndex: newPageIndex,
    });
    this.navigateService.updateParams({
      pageIndex: newPageIndex,
    });
  }

  async onloadOrder(paramFilter?: any) {
    this.loadingSerivce.setLoading();
    this.subscription = this.orderService
      .listOrderLessor(paramFilter ?? {})
      .subscribe({
        next: (res) => {
          const {
            data: { items, pageIndex, pageSize, totalCount },
          } = res;
          this.listData = items;
          this.pageIndex$ = of(pageIndex);
          this.pageTotal$ = of(totalCount);
          this.pageSize$ = of(pageSize);
          this.loadingSerivce.setOtherLoading('loaded');
        },
        error: (err) => {
          this.loadingSerivce.setOtherLoading('error');
          console.error('Order loading error:', err);
        },
      });
  }

  onQueryParams() {
    this.route.paramMap
      .pipe(
        map((params) => {
          const filters: any = {
            pageIndex: +(params.get('pageIndex') ?? '1'),
            pageSize: +(params.get('pageSize') ?? '10'),
            orderStatus: params.get('orderStatus'),
            phoneNumber: params.get('phoneNumber'),
            humanRental: params.get('renter'),
          };
          return filters;
        }),
        tap((filters) => {
          this.navigateService.updateParams(filters);
        }),
        switchMap((filters) => this.onloadOrder(filters))
      )
      .subscribe();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigateService: NavigationService,
    private orderService: OrderService,
    private loadingSerivce: LoadingService,
    private timerCalculatorService: RentalTimerService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onQueryParams();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
