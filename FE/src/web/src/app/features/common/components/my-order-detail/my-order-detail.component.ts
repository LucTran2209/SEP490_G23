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
  convertStatus(orderStatus: ORDER_STATUS) {
    return convertStatusOrder(orderStatus);
  }
}
