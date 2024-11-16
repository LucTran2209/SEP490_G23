import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { MyOrderDetailDto, MyOrderOutputDto, OrderDetailResultService, OrderResultService } from '../../../../interfaces/order.interface';
import { UserService } from '../../../../services/user.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { ProfileResultService } from '../../../../interfaces/user.interface';
import { LoadingService } from '../../../../services/loading.service';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedBackInputDto } from '../../../../interfaces/feedback.interface';
import { MessageResponseService } from '../../../../services/message-response.service';
import { or } from '@angular/fire/firestore';

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
  orderInformation!: MyOrderDetailDto;
  loading = true;
  loading$?: Observable<StatusProcess>;
  searchText: string = '';
  statusOrder: number = 0;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private userProfileService: UserProfileService,
    private messageService: MessageResponseService,
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.loading$ = this.loadingService.status$;
  }
  orderTabs: {
    title: string;
    status: number;
    searchText: string;
    orders: MyOrderOutputDto[];
    ordersNull: boolean;
    placeholder: string;
    isShowBtn1: boolean;
  }[] = [
    {
      title: 'CHỜ PHÊ DUYỆT',
      status: 0,
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt',
      isShowBtn1: false,
    },
    {
      title: 'CHỜ THANH TOÁN',
      status: 1,
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt',
      isShowBtn1: false,
    },
    {
      title: 'CHỜ GIAO HÀNG',
      status: 2,
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt',
      isShowBtn1: false,
    },
    {
      title: 'ĐÃ NHẬN HÀNG',
      status: 3,
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt',
      isShowBtn1: false,
    },
    {
      title: 'CHỜ HOÀN TRẢ',
      status: 4,
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt',
      isShowBtn1: false,
    },
    {
      title: 'HOÀN THÀNH',
      status: 5,
      searchText: '',
      orders: [],
      ordersNull: true,
      placeholder: 'Tìm đơn hàng theo tên shop, mã đơn hàng, tên thiết biệt',
      isShowBtn1: true,
    }
  ];
  ngOnInit() {
    this.loadingService.setLoading();
    // this.route.queryParams.subscribe(params => {
    //   const status = params['status'] || 0;
    //   const filter = params['filter'] || 7;
    //   const searchText = params['searchText'] || ''; 
    //   this.statusOrder = status;
    //   this.selectedFilter = filter;
    //   this.searchText = searchText;
    // });
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
      tab.orders = this.orderList.filter(order =>
        order.orderStatuses.some(status => status.status === tab.status)
      );
      tab.ordersNull = tab.orders.length === 0;
      // if (tab.status === 1 && tab.orders.length > 0) {
      //   tab.isShowBtn1 = true;
      // } else {
      //   tab.isShowBtn1 = false;
      // }
    });
  
    this.cdRef.detectChanges();
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
  showFeedBack(orderId: string){
    this.isVisible = true;
    this.orderService.getOrder(orderId).subscribe({
      next: (res: OrderDetailResultService) => {
        this.orderInformation = res.data;
        console.log(this.orderInformation);
        this.cdRef.detectChanges();
      },
      error: () => {
      }
    })
  }
  handleCloseModal() {
    this.isVisible = false;
  }
  createFeedBack(feedback: FeedBackInputDto){
    this.orderService.createFeedBack(feedback).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Đánh Giá Thành Công!', 3000);
        this.handleCloseModal();
        this.orderTabs.forEach(tab => {
          if (tab.status === 5) {
            tab.isShowBtn1 = false;
          }
        });
        this.loadOrders(this.currentPage, this.pageSize, this.selectedFilter);
      },
      error: (error) => {
        this.messageService.handleError('Đánh Giá Thất Bại!', 3000);
        this.loadOrders(this.currentPage, this.pageSize, this.selectedFilter);
      }
    });
  }
}