import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { MyOrderOutputDto, OrderResultService } from '../../../../interfaces/order.interface';
import { UserService } from '../../../../services/user.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { ProfileResultService } from '../../../../interfaces/user.interface';
import { LoadingService } from '../../../../services/loading.service';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';

@Component({
  selector: 'app-list-my-order',
  templateUrl: './list-my-order.component.html',
  styleUrl: './list-my-order.component.scss'
})
export class ListMyOrderComponent implements OnInit {
  selectedFilter = '7days';
  // searchText1: string = '';
  // searchText2: string = '';
  // searchText3: string = '';
  // searchText4: string = '';
  // searchText5: string = '';
  // searchText6: string = '';
  isVisible : boolean = false;
  username: string = '';
  totalUsers = 0;     
  currentPage = 1;    
  pageSize = 10;  
  orderList: MyOrderOutputDto[] = [];
  orderListNull = true;
  orderError = false;
  loading = true;
  loading$?: Observable<StatusProcess>;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private userProfileService: UserProfileService,
    private loadingService: LoadingService,
  ){
    this.loading$ = this.loadingService.status$;
  }
  orderTabs: {
    title: string;
    status: number;
    searchText: string;
    orders: MyOrderOutputDto[]; // Type the orders as `MyOrderOutputDto[]`
    ordersNull: boolean;
    placeholder: string;
  }[] = [
    {
      title: 'CHỜ PHÊ DUYỆT',
      status: 1,  // status for 'Pending Approval'
      searchText: '',
      orders: [],  // Initialize with an empty array
      ordersNull: true,  // Will be updated later
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'CHỜ THANH TOÁN',
      status: 2,  // status for 'Pending Payment'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'CHỜ GIAO HÀNG',
      status: 3,  // status for 'Pending Delivery'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'ĐÃ NHẬN HÀNG',
      status: 4,  // status for 'Delivered'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'CHỜ HOÀN TRẢ',
      status: 5,  // status for 'Pending Return'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'HOÀN THÀNH',
      status: 6,  // status for 'Completed'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    }
  ];
  ngOnInit() {
    this.loadingService.setLoading();
      this.loadOrders(this.currentPage, this.pageSize);
  }
  loadOrders(pageIndex: number, pageSize: number){
    this.loadingService.setLoading();
    this.orderService.listMyOrder(pageIndex, pageSize).subscribe({
      next: (res: OrderResultService) => {
        this.loadingService.setOtherLoading('loaded');
        this.orderList = res.data.items;
        this.orderListNull = !this.orderList || this.orderList.length === 0;
        this.ListOrdersByStatus();
        console.log(this.orderList);
      },
      error: () => {
        this.orderError = true;
      }
    });
  }
  ListOrdersByStatus() {
    this.orderTabs.forEach(tab => {
      tab.orders = this.orderList.filter(order => order.orderStatuses.some(status => status.status === tab.status));
      tab.ordersNull = tab.orders.length === 0;
    });
  }

  // Function to handle search
  onSearch(status: number) {
    const tab = this.orderTabs.find(tab => tab.status === status);
    if (tab) {
      this.filterOrders(tab);
    }
  }

  // Function to filter orders based on search text
  filterOrders(tab: any) {
    const filteredOrders = this.orderList.filter(order =>
      order.orderStatuses.some(status => status.status === tab.status) &&
      // Check each order detail for the product name
      order.orderDetails.some(orderDetail =>
        orderDetail.product.productName?.includes(tab.searchText) || orderDetail.product.id.includes(tab.searchText) || orderDetail.productId.includes(tab.searchText) // Search by productName, productId, or order code
      )
    );
    tab.orders = filteredOrders;
    tab.ordersNull = filteredOrders.length === 0;
  }
  // onSearch(){

  // }
  showFeedback(){
    this.isVisible = true;
  }
  handleCloseModal() {
    this.isVisible = false;
  }
}