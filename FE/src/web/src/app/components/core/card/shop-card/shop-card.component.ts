import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {  MyOrderOutputDto } from '../../../../interfaces/order.interface';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss'
})
export class ShopCardComponent {
  @Input() order!: MyOrderOutputDto;
  @Input() buttonName1: string = '';
  @Input() buttonName2: string = '';
  @Input() buttonName3: string = '';
  @Input() isShowBtn1: boolean = false;
  @Input() isShowBtn2: boolean = false;
  @Input() isShowBtn3: boolean = false;
  @Output() showFeedBack = new EventEmitter<void>();  
  totalQuantity: number = 0;

  // ngOnInit() {
  //   this.calculateNumberOfRentalDays();
  // }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['order'] && this.order) {
      this.calculateTotalQuantity();
    }
  }
  onClickBtn1(){
    this.showFeedBack.emit();
  }
  // New method to calculate the total quantity
  calculateTotalQuantity(): void {
    this.totalQuantity = this.order.orderDetails.reduce((sum, orderDetail) => {
      return sum + orderDetail.quantity;
    }, 0);
  }
}
