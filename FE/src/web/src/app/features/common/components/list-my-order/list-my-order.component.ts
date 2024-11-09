import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { MyOrderOutputDto, OrderResultService } from '../../../../interfaces/order.interface';
import { UserService } from '../../../../services/user.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { ProfileResultService } from '../../../../interfaces/user.interface';
import { LoadingService } from '../../../../services/loading.service';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-my-order',
  templateUrl: './list-my-order.component.html',
  styleUrl: './list-my-order.component.scss'
})
export class ListMyOrderComponent implements OnInit {
  selectedFilter = 7;
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
  searchText: string = '';
  statusOrder: number = 0;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private userProfileService: UserProfileService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
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
      status: 0,  // status for 'Pending Approval'
      searchText: '',
      orders: [],  // Initialize with an empty array
      ordersNull: true,  // Will be updated later
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'CHỜ THANH TOÁN',
      status: 1,  // status for 'Pending Payment'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'CHỜ GIAO HÀNG',
      status: 2,  // status for 'Pending Delivery'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'ĐÃ NHẬN HÀNG',
      status: 3,  // status for 'Delivered'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'CHỜ HOÀN TRẢ',
      status: 4,  // status for 'Pending Return'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    },
    {
      title: 'HOÀN THÀNH',
      status: 5,  // status for 'Completed'
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt'
    }
  ];
  ngOnInit() {
    this.loadingService.setLoading();
    this.route.queryParams.subscribe(params => {
      const status = params['filter'] || 1;
      const filter = params['filter'] || 7;
      const searchText = params['searchText'] || ''; 
      this.statusOrder = status;
      this.selectedFilter = filter;
      this.searchText = searchText;
    });
    this.loadOrders(this.currentPage, this.pageSize, this.selectedFilter);
  }
  loadOrders(pageIndex: number, pageSize: number, nearDays: number){
    this.loadingService.setLoading();
    this.orderService.listMyOrder(pageIndex, pageSize, nearDays).subscribe({
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
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { status: this.statusOrder, searchText: this.searchText }, // Cập nhật tham số searchText vào URL
        queryParamsHandling: 'merge'
      });
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
    // Hàm gọi khi chuyển tab, cập nhật tham số `status` trong URL
    onTabChange(status: number) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { status: this.statusOrder },
        queryParamsHandling: 'merge' // Giữ lại các tham số khác trong URL
      });
    }
  showFeedback(){
    this.isVisible = true;
  }
  handleCloseModal() {
    this.isVisible = false;
  }
}