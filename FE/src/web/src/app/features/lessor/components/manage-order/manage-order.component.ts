import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzCustomColumn } from 'ng-zorro-antd/table';
import { OptionSelectCheckBox } from '../../../../configs/anonymous.config';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingService } from '../../../../services/loading.service';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  map,
  Observable,
  of,
  pipe,
  take,
  tap,
} from 'rxjs';
import { OrderListResponse } from '../../../../interfaces/order.interface';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { ORDER_STATUS } from '../../../../utils/constant';
import { convertStatusOrder } from '../../../../utils/anonymous.helper';
import { NavigationService } from '../../../../services/navigation.service';

interface CustomColumns extends NzCustomColumn {
  name: string;
  position?: 'left' | 'right';
}

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss',
})
export class ManageOrderComponent implements OnInit {
  // listOfData: IData[] = mockData;
  listData: OrderListResponse[] = [];
  pageIndex$ = new BehaviorSubject<number>(1);
  pageTotal$ = new BehaviorSubject<number>(0);
  pageSize$ = new BehaviorSubject<number>(10);
  // filterFormOrder: FormGroup<{
  //   orderCode: FormControl<string | null>;
  //   orderStatus: FormControl<string | null>;
  //   humanRental: FormControl<string | null>;
  //   phoneNumber: FormControl<string | null>;
  //   timeRange: FormControl<string[] | null>;
  // }>;
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

  onSelectDetail(val: OrderListResponse) {
    console.log('data', val);
    this.router.navigateByUrl(`lessor/order/${val.id}`);
  }

  async onSubmitForm(valGroup: any) {
    const { orderCode, orderStatus, humanRental, phoneNumber, timeRange } =
      valGroup;

    combineLatest([this.pageIndex$ ?? of(1), this.pageSize$ ?? of(10)])
      .pipe(take(1))
      .subscribe(([pageIndex, pageSize]) => {
        const startDate = timeRange ? timeRange[0] : null;
        const endDate = timeRange ? timeRange[1] : null;

        this.onloadOrder({
          pageIndex,
          pageSize,
          orderCode,
          status: orderStatus,
          phoneNumber,
          renterName: humanRental,
          startDate,
          endDate,
        });
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
    this.orderService.listOrderLessor(paramFilter ?? {}).subscribe({
      next: (res) => {
        const {
          data: { items, pageIndex, pageSize, totalCount },
        } = res;
        this.listData = items;
        this.pageIndex$.next(pageIndex);
        this.pageTotal$.next(totalCount);
        this.pageSize$.next(pageSize);
      },
      error: (err) => {
        console.log('<<<< 208>>>>');
        this.loadingSerivce.setOtherLoading('error');
      },
      complete: () => {
        console.log('<<<< 212>>>>');
        this.loadingSerivce.setOtherLoading('loaded');
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
        })
      )
      .subscribe((filters) => {
        this.navigateService.updateParams(filters);
      });
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
    this.onloadOrder();
  }
}

// const mockData = [
//   {
//     maDonHang: 11,
//     ngayTao: '03:49:14 - 27/09/2024',
//     nguoiThue: 'namnh123',
//     soDienThoai: '0327033756',
//     thoiGianThue: '20 ngày',
//     giaCoc: '200.000',
//     tongTien: '500.000',
//     noiDung: 'Cong tien giao dich 123456',
//     trangThaiDonHang: 'Đang giao',
//     trangThaiThanhToan: 'Thanh toán cọc',
//   },
//   {
//     maDonHang: 12,
//     ngayTao: '03:49:14 - 27/09/2024',
//     nguoiThue: 'cuongqt123',
//     soDienThoai: '0327033756',
//     thoiGianThue: '5 ngày',
//     giaCoc: '200.000',
//     tongTien: '500.000',
//     noiDung: 'Cong tien giao dich 123456',
//     trangThaiDonHang: 'Thành công',
//     trangThaiThanhToan: 'Thanh toán tất cả',
//   },
//   {
//     maDonHang: 12,
//     ngayTao: '03:49:14 - 27/09/2024',
//     nguoiThue: 'cuongqt123',
//     soDienThoai: '0327033756',
//     thoiGianThue: '5 ngày',
//     giaCoc: '200.000',
//     tongTien: '500.000',
//     noiDung: 'Cong tien giao dich 123456',
//     trangThaiDonHang: 'Thành công',
//     trangThaiThanhToan: 'Thanh toán tất cả',
//   },
//   {
//     maDonHang: 12,
//     ngayTao: '03:49:14 - 27/09/2024',
//     nguoiThue: 'cuongqt123',
//     soDienThoai: '0327033756',
//     thoiGianThue: '5 ngày',
//     giaCoc: '200.000',
//     tongTien: '500.000',
//     noiDung: 'Cong tien giao dich 123456',
//     trangThaiDonHang: 'Thành công',
//     trangThaiThanhToan: 'Thanh toán tất cả',
//   },
//   {
//     maDonHang: 12,
//     ngayTao: '03:49:14 - 27/09/2024',
//     nguoiThue: 'cuongqt123',
//     soDienThoai: '0327033756',
//     thoiGianThue: '5 ngày',
//     giaCoc: '200.000',
//     tongTien: '500.000',
//     noiDung: 'Cong tien giao dich 123456',
//     trangThaiDonHang: 'Thành công',
//     trangThaiThanhToan: 'Thanh toán tất cả',
//   },
//   {
//     maDonHang: 12,
//     ngayTao: '03:49:14 - 27/09/2024',
//     nguoiThue: 'cuongqt123',
//     soDienThoai: '0327033756',
//     thoiGianThue: '5 ngày',
//     giaCoc: '200.000',
//     tongTien: '500.000',
//     noiDung: 'Cong tien giao dich 123456',
//     trangThaiDonHang: 'Thành công',
//     trangThaiThanhToan: 'Thanh toán tất cả',
//   },
//   {
//     maDonHang: 12,
//     ngayTao: '03:49:14 - 27/09/2024',
//     nguoiThue: 'cuongqt123',
//     soDienThoai: '0327033756',
//     thoiGianThue: '5 ngày',
//     giaCoc: '200.000',
//     tongTien: '500.000',
//     noiDung: 'Cong tien giao dich 123456',
//     trangThaiDonHang: 'Thành công',
//     trangThaiThanhToan: 'Thanh toán tất cả',
//   },
//   {
//     maDonHang: 12,
//     ngayTao: '03:49:14 - 27/09/2024',
//     nguoiThue: 'cuongqt123',
//     soDienThoai: '0327033756',
//     thoiGianThue: '5 ngày',
//     giaCoc: '200.000',
//     tongTien: '500.000',
//     noiDung: 'Cong tien giao dich 123456',
//     trangThaiDonHang: 'Thành công',
//     trangThaiThanhToan: 'Thanh toán tất cả',
//   },
// ];
