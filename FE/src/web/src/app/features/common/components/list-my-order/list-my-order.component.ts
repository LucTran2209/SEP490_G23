import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { OrderByUserOutputDto, OrderResultService } from '../../../../interfaces/order.interface';
import { UserService } from '../../../../services/user.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { ProfileResultService } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-list-my-order',
  templateUrl: './list-my-order.component.html',
  styleUrl: './list-my-order.component.scss'
})
export class ListMyOrderComponent implements OnInit {
  selectedFilter = '7days';
  searchText1: string = '';
  searchText2: string = '';
  searchText3: string = '';
  searchText4: string = '';
  searchText5: string = '';
  searchText6: string = '';
  isVisible : boolean = false;
  username: string = '';
  totalUsers = 0;     
  currentPage = 1;    
  pageSize = 10;  
  orderList: OrderByUserOutputDto[] = [];
  orderListNull = true;
  orderError = true;
  loading = true;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private userProfileService: UserProfileService,
  ){

  }
  async ngOnInit() {
    try {
      const userId = await this.getUserId(); // Wait for the user ID
      this.loadOrders(this.currentPage, this.pageSize, userId);
    } catch (error) {
      console.error('Failed to fetch user ID:', error);
      this.loading = false; // Handle loading state in case of error
    }
  }
  loadOrders(pageIndex: number, pageSize: number, userId: string){
    this.orderService.listMyOrder(pageIndex, pageSize, userId).subscribe({
      next: (res: OrderResultService) => {
        this.orderList = res.data.items;
        this.orderListNull = !this.orderList || this.orderList.length === 0;
        this.orderError = false;
        this.loading = false;
      },
      error: () => {
        this.orderError = true;
        this.loading = false;
      }
    });
  }
  getUserId(): Promise<string> {
    const userCurrent = this.userProfileService.currentUser;
    this.username = userCurrent?.UserName;
  
    return new Promise((resolve, reject) => {
      this.userService.viewProfile(this.username).subscribe({
        next: (res: ProfileResultService) => {
          const userId = res.data.id; // Extract user ID
          resolve(userId); // Resolve the promise with user ID
        },
        error: () => {
          console.error('Error fetching user ID');
          reject(null); // Reject the promise on error
        }
      });
    });
  }
  onSearch(){

  }
  showFeedback(){
    this.isVisible = true;
  }
  handleCloseModal() {
    this.isVisible = false;
  }

}