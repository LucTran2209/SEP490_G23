import { Component, OnInit } from '@angular/core';
import { MyOrderDetailDto, OrderDetailResultService, OrderResultService } from '../../../../interfaces/order.interface';
import { OrderService } from '../../../../services/order.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { Observable } from 'rxjs';
import { ORDER_STATUS } from '../../../../utils/constant';
import { convertStatusOrder } from '../../../../utils/anonymous.helper';

@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.component.html',
  styleUrl: './my-order-detail.component.scss'
})
export class MyOrderDetailComponent implements OnInit {
  currentStep = 1; // Bước hiện tại
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
  ){
    this.loading$ = this.loadingService.status$;
  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(){
    this.loadingService.setLoading();
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id') || '';
      this.loadOrder(this.orderId);
    });
    console.log(this.orderId);
    console.log(this.numberofRentalTimes);
    
  }
  loadOrder(orderId: string){
    this.loadingService.setLoading();
    this.orderService.getOrder(orderId).subscribe({
      next: (res: OrderDetailResultService) => {
        this.order = res.data;
        this.loadingService.setOtherLoading('loaded');
        this.calculateTimeDifferenceInHours();
        this.calculateTotalRentAndDeposit();
        console.log(this.order);
      },
      error: () => {
      }
    })
  }

  calculateNumberOfRentalDays(): number {
    // Ensure the startDate and endDate are valid Date objects
    const startDate = new Date(this.order.startDate);
    const endDate = new Date(this.order.endDate);
  
    // Set both startDate and endDate to the start of the day
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
  
    // Calculate the time difference in milliseconds
    const timeDiff = endDate.getTime() - startDate.getTime();
  
    // If the time difference is negative or zero, handle it as an invalid or same-day rental
    if (timeDiff <= 0) {
      this.numberofRentalTimes = 0;
      return 0;
    }
  
    // Tính số ngày cho thuê
    return Math.floor(timeDiff / (1000 * 3600 * 24)); // Chuyển chênh lệch thời gian thành số ngày
  }
  
  calculateTimeDifferenceInHours(): void {
    const startDate = new Date(this.order.startDate);
    const endDate = new Date(this.order.endDate);
  
    // Calculate the time difference in milliseconds
    const timeDiff = endDate.getTime() - startDate.getTime();
    
    // Calculate the number of rental days and hours
    const days = Math.floor(timeDiff / (1000 * 3600 * 24)); // Số ngày
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)); // Số giờ
  
    if (days > 0 && this.order.startDate != this.order.endDate) {
      // Nếu số ngày thuê lớn hơn 0, hiển thị theo số ngày
      this.numberofRentalTimes = days;
      this.timeString = `${this.numberofRentalTimes} ngày`;
    } else {
      // Nếu số ngày thuê bằng 0, hiển thị theo số giờ
      this.numberofRentalTimes = hours;
      this.timeString = `${this.numberofRentalTimes} giờ`;
    }
  }
  calculateTotalRentAndDeposit(): void {
    this.totalPrice = this.order.totalRentPrice * this.numberofRentalTimes + this.order.totalDepositPrice;
  }
  convertStatus(orderStatus: ORDER_STATUS) {
    return convertStatusOrder(orderStatus);
  }
}
