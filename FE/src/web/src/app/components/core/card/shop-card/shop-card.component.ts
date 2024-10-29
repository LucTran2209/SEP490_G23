import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DetailOfProduct, OrderByUserOutputDto } from '../../../../interfaces/order.interface';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss'
})
export class ShopCardComponent {
  @Input() order!: OrderByUserOutputDto;
  @Input() buttonName1: string = '';
  @Input() buttonName2: string = '';
  @Input() buttonName3: string = '';
  @Input() isShowBtn1: boolean = false;
  @Input() isShowBtn2: boolean = false;
  @Input() isShowBtn3: boolean = false;
  @Input() isInDetailView: boolean = false;
  @Output() showFeedBack = new EventEmitter<void>();  
  numberofRentalDays: number = 0;

  // ngOnInit() {
  //   this.calculateNumberOfRentalDays();
  // }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['order'] && this.order) {
      // Chỉ tính số ngày thuê khi `order` đã có giá trị
      this.calculateNumberOfRentalDays();
    }
  }
  onClickBtn1(){
    this.showFeedBack.emit();
  }
  calculateNumberOfRentalDays() {
    const startDate = new Date(this.order.startDate);
    const endDate = new Date(this.order.endDate);
    
    const timeDiff = endDate.getTime() - startDate.getTime();
    this.numberofRentalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    console.log(this.numberofRentalDays);
  }
}
