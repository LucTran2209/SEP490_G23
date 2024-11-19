import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {  MyOrderOutputDto } from '../../../../interfaces/order.interface';
import { Router } from '@angular/router';
import { ORDER_STATUS } from '../../../../utils/constant';
import { convertStatusOrder } from '../../../../utils/anonymous.helper';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss'
})
export class ShopCardComponent {
  @Input() order!: MyOrderOutputDto;
  @Input() isShowBtn1: boolean = false;
  @Input() isShowBtn2: boolean = false;
  @Input() isShowBtn3: boolean = false;
  orderStatusMessage: string = '';
  orderStatusClass: string = '';
  @Output() showFeedBack = new EventEmitter<string>();  
  totalQuantity: number = 0;

  constructor(
    private router: Router,
  ) {}

  // ngOnInit() {
  //   this.calculateNumberOfRentalDays();
  // }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['order'] && this.order) {
      this.calculateTotalQuantity();
    }
  }
  onClickBtn1(){
    this.showFeedBack.emit(this.order.id);
  }
  // New method to calculate the total quantity
  calculateTotalQuantity(): void {
    this.totalQuantity = this.order.orderDetails.reduce((sum, orderDetail) => {
      return sum + orderDetail.quantity;
    }, 0);
  }
  convertStatus(orderStatus: ORDER_STATUS) {
    return convertStatusOrder(orderStatus);
  }
  goToShop(){
    this.router.navigate(['/common/shop',this.order.rentalShopId]);
  }
}
