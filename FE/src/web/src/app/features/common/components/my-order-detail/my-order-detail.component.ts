import { Component, OnInit } from '@angular/core';
import { Deposit, MyOrderDetailDto, OrderDetailResultService, OrderResultService } from '../../../../interfaces/order.interface';
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
  totalDailyRent: number = 0;
  numberofRentalTimes: number = 0;
  timeString: string = '';
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
  ){
    this.loading$ = this.loadingService.status$;
  }
  goBack(): void {
    this.location.back();
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
  convertRentalDay(startDate: string, endDate: string) {
    let diffDate_start = new Date(startDate);
    let diffDate_end = new Date(endDate);
    return this.timerCalculatorService.convertRentalDays([
      diffDate_start,
      diffDate_end,
    ]);
  }
  calculateTotalRentAndDeposit(): void {
    this.totalPrice = this.order.totalRentPrice * this.convertRentalDay(this.order.startDate, this.order.endDate) + this.order.totalDepositPrice;
  }
  convertStatus(orderStatus: ORDER_STATUS) {
    return convertStatusOrder(orderStatus);
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
        this.messageService.showSuccess('Bạn Đã Thanh Toán Đơn Hàng Thất Bại!', 3000);
        this.isVisible = false;
      }
    });
  }
  cancelForm(){
    this.messageService.showInfo('Bạn Chưa Thanh Toán Đơn Hàng Này!', 3000);
    this.isVisible = false;
  }
}
