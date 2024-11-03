import { Component, OnInit } from '@angular/core';
import { OrderByUserOutputDto, OrderResultService } from '../../../../interfaces/order.interface';
import { OrderService } from '../../../../services/order.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.component.html',
  styleUrl: './my-order-detail.component.scss'
})
export class MyOrderDetailComponent implements OnInit {
  currentStep = 1; // Bước hiện tại
  orderId: string = '';
  order!: OrderByUserOutputDto;
  loading = true;
  totalDepositPrice = 0;
  totalDailyRent: number = 0;
  numberofRentalDays: number = 0;
  // Handle the step change event
  onStepChange(index: number): void {
    this.currentStep = index;
  }
  constructor(
    private orderService: OrderService,
    private location: Location,
    private route: ActivatedRoute,
  ){}
  goBack(): void {
    this.location.back();
  }
  ngOnInit(){
    // this.route.paramMap.subscribe(params => {
    //   this.orderId = params.get('id') || '';
    // });
    // // this.orderId = '5613ff49-0d6a-40ff-9bb1-d2278031c602';
    // this.loadOrder(this.orderId);
    
  }
  loadOrder(orderId: string){
    this.orderService.getOrder(orderId).subscribe({
      next: (res: OrderResultService) => {
        this.order = res.data.items[0];
        this.calculateTotalDepositPrice();
        this.calculateTotalDailyRent();
        this.calculateNumberOfRentalDays();
        console.log(this.order);
        this.loading = false;
      },
      error: () => {
        this.loading = true;
      }
    })
  }
  calculateTotalDepositPrice() {
    this.totalDepositPrice = this.order.detailProducts.reduce((sum, product) => {
      return sum + product.depositPrice;
    }, 0);
  }
  calculateTotalDailyRent() {
    // Tính tổng giá thuê của các sản phẩm trong `detailProducts`
    this.totalDailyRent = this.order.detailProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
  }
  calculateNumberOfRentalDays() {
    const startDate = new Date(this.order.startDate);
    const endDate = new Date(this.order.endDate);

    const timeDiff = endDate.getTime() - startDate.getTime();
    this.numberofRentalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  }

}
