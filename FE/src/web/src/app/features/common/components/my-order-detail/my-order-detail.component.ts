import { Component, OnInit } from '@angular/core';
import { Deposit, MyOrderDetailDto, OrderDetailResultService, OrderListResponse, OrderResultService } from '../../../../interfaces/order.interface';
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
  voucherPrice: number = 0;
  loading$?: Observable<StatusProcess>;
  orderStatusMessage: string = '';
  orderStatusClass: string = '';
  // Handle the step change event
  onStepChange(index: number): void {
    this.currentStep = index;
  }
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
        this.loadingService.setOtherLoading('loaded');
        // this.calculateTimeDifferenceInHours();
        this.calculateTotalRentAndDeposit();
        console.log(this.order);
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
        this.messageService.handleError('Bạn Đã Thanh Toán Đơn Hàng Thất Bại!', 3000);
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
     this.realTotal = totalRentPrice * this.convertRentalDay(this.order.startDate, this.order.endDate) + this.order.totalDepositPrice;
     // Tính tổng tiền thuê và tiền đặt cọc
     this.totalPrice = this.order.totalRentPrice + this.order.totalDepositPrice;
     
     this.voucherPrice = this.realTotal - this.totalPrice;
  }
  
}
