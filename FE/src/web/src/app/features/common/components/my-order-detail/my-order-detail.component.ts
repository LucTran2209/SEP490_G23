import { Component, OnInit } from '@angular/core';
import { Deposit, MyOrderDetailDto, OrderDetailResultService, OrderListResponse, OrderResultService, OrderStatus } from '../../../../interfaces/order.interface';
import { OrderService } from '../../../../services/order.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { Observable } from 'rxjs';
import { ORDER_STATUS } from '../../../../utils/constant';
import { convertStatusOrder } from '../../../../utils/anonymous.helper';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { PaymentService } from '../../../../services/payment.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { ProductItemResponse, ProductOutputDto, ProductResultService } from '../../../../interfaces/product.interface';
import { ProductService } from '../../../../services/product.service';
import { BaseResponseApi } from '../../../../interfaces/api.interface';
import { VoucherDetailOutputDto } from '../../../../interfaces/voucher.interface';

@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.component.html',
  styleUrl: './my-order-detail.component.scss'
})
export class MyOrderDetailComponent implements OnInit {
  currentStep = 1; // Bước hiện tại
  isVisible: boolean = false
  orderId: string = '';
  order!: MyOrderDetailDto;
  totalPrice = 0;
  totalRentPrice: number = 0;
  numberofRentalTimes: number = 0;
  realTotal: number = 0;
  timeString: string = '';
  voucher!: VoucherDetailOutputDto;
  voucherPrice: number = 0;
  loading$?: Observable<StatusProcess>;
  orderStatuses: OrderStatus[] = [];
  orderStatusMessage: string = '';
  orderStatusClass: string = '';
  // Handle the step change event
  onStepChange(index: number): void {
    this.currentStep = index;
  }
  sortedStatuses: any[] = [];
  timelineItems = [
    { label: 'Xử lý đơn hàng', status: 0 },
    { label: 'Chuẩn bị giao hàng', status: 1 },
    { label: 'Đang giao hàng', status: 2 },
    { label: 'Giao thành công', status: 3 },
    { label: 'Đã nhận hàng', status: 4 },
    { label: 'Đang hoàn trả hàng', status: 5 },
    { label: 'Hoàn trả thành công', status: 6 },
    { label: 'Hủy Đơn', status: 7 },

  ];
  constructor(
    private orderService: OrderService,
    private location: Location,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private router: Router,
    private timerCalculatorService: RentalTimerService,
    private paymentService: PaymentService,
    private messageService: MessageResponseService,
    private productService: ProductService,
  ){
    this.loading$ = this.loadingService.status$;
  }
  goBack(): void {
    this.router.navigate(['/common/user/order'], { queryParams: { status: this.getOrderStatusLatest(this.order) } });
  }
  ngOnInit(){
    this.isVisible = false;
    this.loadingService.setLoading();
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id') || '';
      this.loadOrder(this.orderId);
    });
    console.log(this.orderId);
  }
  loadOrder(orderId: string){
    this.loadingService.setLoading();
    this.orderService.getOrder(orderId).subscribe({
      next: (res: OrderDetailResultService) => {
        this.order = res.data;
        this.orderStatuses = res.data.orderStatuses;
        this.voucher = res.data.voucher;
        if(this.voucher !== null){
          this.voucherPrice = res.data.voucher.discountValue;
        }
        this.loadingService.setOtherLoading('loaded');
        this.calculateTotalRentAndDeposit();
        // Lọc trạng thái có mặt trong orderStatuses
        const statuses = this.orderStatuses.map(status => status.status);

        // Nếu có trạng thái "Hủy Đơn" (status 7)
        if (statuses.includes(7)) {
          // Chỉ hiển thị "Xử lý đơn hàng" và "Hủy Đơn" (status 0 và 7)
          this.sortedStatuses = this.timelineItems.filter(item => item.status === 0 || item.status === 7);
        } else {
          // Nếu không có status 7, hiển thị tất cả các bước bình thường trừ "Hủy Đơn"
          this.sortedStatuses = this.timelineItems.filter(item => item.status !== 7);
        }

        this.sortedStatuses = this.timelineItems
        .filter(item => statuses.includes(7) ? [0, 7].includes(item.status) : item.status !== 7)
        .map((timeline) => {
        const matchedStatus = this.orderStatuses.find(status => status.status === timeline.status);
        return {
          ...timeline,
          date: matchedStatus ? matchedStatus.createdDate : null,
          color: statuses.includes(7) ? 'red' : (matchedStatus ? 'blue' : 'gray'),
          message: matchedStatus ? matchedStatus.message : null,
        };
      });
        console.log("Status List: ", this.orderStatuses);
      },
      error: () => {
      }
    })
  }
  onNavigate(productId: string) {
    this.productService.getProductDetail(productId).subscribe((res: BaseResponseApi<ProductItemResponse>) => {
      this.router.navigate([
        '/common/product-detail',
        res.data.productName,
        '.i',
        `${res.data.id}`,
        '.suid',
        `${res.data.subCategory?.id}`,
        `${res.data.subCategory?.subCategoryName}`
      ]);
    });
  }
  convertRentalDay(startDate: string, endDate: string) {
    let diffDate_start = new Date(startDate);
    let diffDate_end = new Date(endDate);
    return this.timerCalculatorService.convertRentalDays([
      diffDate_start,
      diffDate_end,
    ]);
  }
  // calculateTotalRentAndDeposit(): void {
  //   this.totalPrice = this.order.totalRentPrice * this.convertRentalDay(this.order.startDate, this.order.endDate) + this.order.totalDepositPrice;
  // }
  convertStatus(orderStatus: ORDER_STATUS) {
    return convertStatusOrder(orderStatus);
  }
  getOrderStatusLatest(orderDetail: MyOrderDetailDto): number {
    return orderDetail.orderStatuses.reduce(
      (max, item) => Math.max(max, item.status),
      -Infinity
    );
  }
  showModalDeposit(){
    this.isVisible = true;
  }
  onDeposit(){
    const shopId = this.route.snapshot.paramMap.get('shopId');
    const data: Deposit = {
      orderId: this.orderId,
      rentalShopId: shopId,
      depoitAmount: this.totalPrice,
    };
    this.paymentService.depositMoney(data).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Bạn Đã Thanh Toán Đơn Hàng Thành Công!', 3000);
        this.loadOrder(this.orderId);
        this.isVisible = false;
        
      },
      error: (error) => {
        this.messageService.handleError('Tài Khoản Của Bạn Không Đủ! Vui Lòng Nạp Thêm TIền Để Thanh Toán', 3000);
        setTimeout(() => {
          this.router.navigate(['/common/user/payment/my-wallet']);
        }, 3000);
        this.isVisible = false;
      }
    });
  }
  cancelForm(){
    this.messageService.showInfo('Bạn Chưa Thanh Toán Đơn Hàng Này!', 3000);
    this.isVisible = false;
  }

  calculateTotalRentAndDeposit(): void {
    // Tính tổng tiền thuê dựa trên từng sản phẩm
    const totalRentPrice = this.order.orderDetails.reduce((total, detail) => {
      const rentalPrice = detail.product.rentalPrice; // Giá thuê sản phẩm
      const quantity = detail.quantity; // Số lượng sản phẩm
      return total + rentalPrice * quantity;
    }, 0);
    this.totalRentPrice = totalRentPrice;
     this.realTotal = this.order.totalRentPrice - this.voucherPrice;
     // Tính tổng tiền thuê và tiền đặt cọc
     if(this.realTotal >= this.order.totalDepositPrice){
       this.totalPrice = this.realTotal + this.order.totalDepositPrice;
     }else{
      this.totalPrice = this.order.totalDepositPrice;
     }
  }
}
