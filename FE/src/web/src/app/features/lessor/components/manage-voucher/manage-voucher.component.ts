import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../../services/navigation.service';
import { OrderService } from '../../../../services/order.service';
import { LoadingService } from '../../../../services/loading.service';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { OptionSelectCheckBox } from '../../../../configs/anonymous.config';
import { ORDER_STATUS } from '../../../../utils/constant';
import { convertStatusOrder } from '../../../../utils/anonymous.helper';
import { OrderListResponse } from '../../../../interfaces/order.interface';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { NzCustomColumn } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-manage-voucher',
  templateUrl: './manage-voucher.component.html',
  styleUrl: './manage-voucher.component.scss',
})
export class ManageVoucherComponent {
  listData: OrderListResponse[] = [];
  pageIndex$: Observable<number> = of(1);
  pageTotal$?: Observable<number>;
  pageSize$: Observable<number> = of(10);
  customColumn: CustomColumns[] = [
    {
      name: 'Mã Khuyến Mãi',
      value: 'maVoucher',
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
      name: 'Ngày Bắt Đầu',
      value: 'ngayBatDau',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Ngày Kết Thúc',
      value: 'ngayKetThuc',
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
      name: 'Nội dung',
      value: 'noiDung',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Trạng thái',
      value: 'trangThai',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
    {
      name: 'Chỉnh Sửa',
      value: 'chinhSua',
      default: true,
      position: 'left',
      width: 200,
      fixWidth: true,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigateService: NavigationService,
    private orderService: OrderService,
    private loadingSerivce: LoadingService,
    private timerCalculatorService: RentalTimerService,
    private cdRef: ChangeDetectorRef
  ) {}

  handleChooseViewCell(arr: OptionSelectCheckBox[]) {
    this.customColumn = this.customColumn.map((item, index) => ({
      ...item,
      default: arr[index].checked,
    }));
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

  onSubmitForm(valGroup: any) {
    const { voucherCode, createdDate, timeRange } =
      valGroup;
    const startDate =
      timeRange && timeRange.length !== 0 ? timeRange[0].toISOString() : null;
    const endDate =
      timeRange && timeRange.length !== 0 ? timeRange[1].toISOString() : null;
    this.onloadOrder({
      pageIndex: 1,
      pageSize: 10,
      voucherCode,
      createdDate,
      startDate,
      endDate,
    });

    this.navigateService.updateParams({
      pageIndex: 1,
      pageSize: 10,
      createdDate,
      startDate,
      endDate,
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
    this.orderService.listOrderLessor(paramFilter ?? {}).pipe(
      map((res) => {
        const {
          data: { items, pageIndex, pageSize, totalCount },
        } = res;
        this.listData = items;
        this.pageIndex$ = of(pageIndex);
        this.pageTotal$ = of(totalCount);
        this.pageSize$ = of(pageSize);
        this.loadingSerivce.setOtherLoading('loaded');
      }),
      catchError((err) => {
        this.loadingSerivce.setOtherLoading('error');
        console.error('Order loading error:', err);
        return of([]);
      })
    ).subscribe();
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
        tap((filters) => {this.navigateService.updateParams(filters);}),
        switchMap((filters) => this.onloadOrder(filters))
      )
      .subscribe();
  }



  ngOnInit(): void {
    this.onQueryParams();
  }
}

interface CustomColumns extends NzCustomColumn {
  name: string;
  position?: 'left' | 'right';
}