import { Component } from '@angular/core';

@Component({
  selector: 'app-list-my-order',
  templateUrl: './list-my-order.component.html',
  styleUrl: './list-my-order.component.scss'
})
export class ListMyOrderComponent {
  selectedFilter = '7days';
  searchText1: string = '';
  searchText2: string = '';
  searchText3: string = '';
  searchText4: string = '';
  searchText5: string = '';
  searchText6: string = '';
  isVisible : boolean = false;
  onSearch(){

  }
  showFeedback(){
    this.isVisible = true;
  }
  handleCloseModal() {
    this.isVisible = false;
  }
}