import { Component, OnInit } from '@angular/core';
import { MyOrderDetailDto, OrderDetailResultService, OrderResultService } from '../../../../interfaces/order.interface';
import { OrderService } from '../../../../services/order.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { Observable } from 'rxjs';

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
  numberofRentalDays: number = 0;
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
    
  }
  loadOrder(orderId: string){
    this.loadingService.setLoading();
    this.orderService.getOrder(orderId).subscribe({
      next: (res: OrderDetailResultService) => {
        this.order = res.data;
        this.loadingService.setOtherLoading('loaded');
        this.calculateNumberOfRentalDays();
        this.calculateTotalRentAndDeposit();
        this.setStatusMessage();
        console.log(this.order);
      },
      error: () => {
      }
    })
  }

  calculateNumberOfRentalDays(): void {
    // Ensure the startDate and endDate are valid Date objects
    const startDate = new Date(this.order.startDate);
    const endDate = new Date(this.order.endDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const timeDiff = endDate.getTime() - startDate.getTime();
    this.numberofRentalDays = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert time diff to number of days
  }
  calculateTotalRentAndDeposit(): void {
    this.totalPrice = this.order.totalRentPrice * this.numberofRentalDays + this.order.totalDepositPrice;
  }
  setStatusMessage(): void {
    const status = this.order?.orderStatuses[0]?.status;
    if (status === 0) {
      this.orderStatusMessage = 'Đang phê duyệt';
      this.orderStatusClass = 'p-2 border-2 text-lime-500 border-lime-500 bg-lime-100 text-xs';
    } else if (status === 1) {
      this.orderStatusMessage = 'Chờ Thanh Toán';
      this.orderStatusClass = 'p-2 border-2 text-yellow-500 border-yellow-500 bg-yellow-100 text-xs';
    } else if (status === 2){
      this.orderStatusMessage = 'Chờ Giao Hàng';
      this.orderStatusClass = 'p-2 border-2 text-gray-500 border-gray-500 bg-gray-100 text-xs';
    } else if (status === 3){
      this.orderStatusMessage = 'Đã Nhận Hàng';
      this.orderStatusClass = 'p-2 border-2 text-gray-500 border-gray-500 bg-gray-100 text-xs';
    } else if (status === 4){
      this.orderStatusMessage = 'Chờ Hoàn Trả';
      this.orderStatusClass = 'p-2 border-2 text-gray-500 border-gray-500 bg-gray-100 text-xs';
    } else if (status === 5){
      this.orderStatusMessage = 'Hoàn Thành';
      this.orderStatusClass = 'p-2 border-2 text-gray-500 border-gray-500 bg-gray-100 text-xs';
    }
  }
}
