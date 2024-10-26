import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss'
})
export class ShopCardComponent {
  @Input() shopName: string = '';
  @Input() buttonName1: string = '';
  @Input() buttonName2: string = '';
  @Input() buttonName3: string = '';
  @Input() isShowBtn1: boolean = false;
  @Input() isShowBtn2: boolean = false;
  @Input() isShowBtn3: boolean = false;
  @Input() time: string = '';
  @Output() showFeedBack = new EventEmitter<void>();  
  
  onClickBtn1(){
    this.showFeedBack.emit();
  }
}
