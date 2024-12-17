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
  @Input() isShowBtn4: boolean = false;
  orderStatusMessage: string = '';
  orderStatusClass: string = '';
  @Output() showFeedBack = new EventEmitter<string>();  
  @Output() cancelOrder = new EventEmitter<string>();  
  @Output() receiveOrder = new EventEmitter<string>();  
  @Output() returnOrder = new EventEmitter<string>();  
  totalQuantity: number = 0;
  overdueDays: number = 0;
  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkOverdue();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['order'] && this.order) {
      this.calculateTotalQuantity();
    }
  }
  onClickBtn1(){
    this.showFeedBack.emit(this.order.id);
  }
  onClickBtn2(){
    this.cancelOrder.emit(this.order.id);
  }
  onClickBtn3(){
    this.receiveOrder.emit(this.order.id);
  }
  onClickBtn4(){
    this.returnOrder.emit(this.order.id);
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
  getOrderStatusLatest(orderDetail: MyOrderOutputDto): number {
    return orderDetail.orderStatuses.reduce(
      (max, item) => Math.max(max, item.status),
      -Infinity
    );
  }
  checkOverdue(): void {
    const currentDate = new Date(); // Lấy ngày hiện tại
    const endDate = new Date(this.order.endDate); // Chuyển đổi orderEndDate thành đối tượng Date

    if (endDate < currentDate) {
      const timeDifference = currentDate.getTime() - endDate.getTime(); // Tính độ chênh lệch thời gian
      this.overdueDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Chuyển đổi độ chênh lệch thành số ngày
    } else {
      this.overdueDays = 0; // Nếu chưa quá hạn
    }
  }
}
