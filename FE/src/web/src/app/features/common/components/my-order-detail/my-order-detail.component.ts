import { Component, OnInit } from '@angular/core';
import { MyOrderOutputDto, OrderResultService } from '../../../../interfaces/order.interface';
import { OrderService } from '../../../../services/order.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  order!: MyOrderOutputDto;
  loading = true;
  totalPrice = 0;
  totalDailyRent: number = 0;
  numberofRentalDays: number = 0;
  loading$?: Observable<StatusProcess>;
  // Handle the step change event
  onStepChange(index: number): void {
    this.currentStep = index;
  }
  constructor(
    private orderService: OrderService,
    private location: Location,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
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
    });
    console.log(this.orderId);
    this.loadOrder(this.orderId);
    
  }
  loadOrder(orderId: string){
    this.loadingService.setLoading();
    this.orderService.getOrder(orderId).subscribe({
      next: (res: OrderResultService) => {
        this.order = res.data.items[0];
        this.loadingService.setOtherLoading('loaded');
        this.calculateNumberOfRentalDays();
        console.log(this.order);
        this.loading = false;
      },
      error: () => {
        this.loading = true;
      }
    })
  }

  calculateNumberOfRentalDays(): void {
    // Ensure the startDate and endDate are valid Date objects
    const startDate = new Date(this.order.startDate);
    const endDate = new Date(this.order.endDate);

    const timeDiff = endDate.getTime() - startDate.getTime();
    this.numberofRentalDays = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert time diff to number of days
  }
  calculateTotalRentAndDeposit(): void {
    this.totalPrice = this.order.totalRentPrice * this.numberofRentalDays + this.order.totalDepositPrice;
  }
}
