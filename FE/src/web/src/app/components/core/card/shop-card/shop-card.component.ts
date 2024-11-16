import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {  MyOrderOutputDto } from '../../../../interfaces/order.interface';

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

  // ngOnInit() {
  //   this.calculateNumberOfRentalDays();
  // }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['order'] && this.order) {
      this.calculateTotalQuantity();
      this.setStatusMessage();
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
  setStatusMessage(): void {
    const status = this.order?.orderStatuses[0]?.status;
    if (status === 0) {
      this.orderStatusMessage = 'Đang phê duyệt';
      this.orderStatusClass = 'p-2 border-2 text-lime-500 border-lime-500 bg-lime-100 text-xs w-28';
      
    } else if (status === 1) {
      this.orderStatusMessage = 'Chờ Thanh Toán';
      this.orderStatusClass = 'p-2 border-2 text-yellow-500 border-yellow-500 bg-yellow-100 text-xs w-28';
      this.isShowBtn1 = true;
    } else if (status === 2){
      this.orderStatusMessage = 'Chờ Giao Hàng';
      this.orderStatusClass = 'p-2 border-2 text-gray-500 border-gray-500 bg-gray-100 text-xs w-28';
    } else if (status === 3){
      this.orderStatusMessage = 'Đã Nhận Hàng';
      this.orderStatusClass = 'p-2 border-2 text-gray-500 border-gray-500 bg-gray-100 text-xs w-28';
    } else if (status === 4){
      this.orderStatusMessage = 'Chờ Hoàn Trả';
      this.orderStatusClass = 'p-2 border-2 text-gray-500 border-gray-500 bg-gray-100 text-xs w-28';
    } else if (status === 5){
      this.orderStatusMessage = 'Hoàn Thành';
      this.orderStatusClass = 'p-2 border-2 text-gray-500 border-gray-500 bg-gray-100 text-xs w-28';
      
    }
  }
}
