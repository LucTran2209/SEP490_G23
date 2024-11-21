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
  totalOrders = 0;     
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
    currentPage: number;
    totalOrders: number;
    searchText: string;
    orders: MyOrderOutputDto[];
    ordersNull: boolean;
    placeholder: string;
    isShowBtn1: boolean;
  }[] = [
    { title: 'CHỜ XÁC NHẬN', status: 0, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...', isShowBtn1: false, },
    { title: 'CHỜ THANH TOÁN', status: 1, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false, },
    { title: 'CHỜ GIAO HÀNG', status: 2, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false },
    { title: 'ĐÃ NHẬN HÀNG', status: 3, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false },
    { title: 'CHỜ HOÀN TRẢ', status: 4, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false },
    { title: 'HOÀN THÀNH', status: 5, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: true },
    { title: 'HỦY ĐƠN', status: 6, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false }
  ];
  ngOnInit() {
    this.loadingService.setLoading();
    this.loadOrders(this.currentPage, this.pageSize, this.selectedFilter);
  }

  loadOrders(pageIndex: number, pageSize: number, nearDays: number, search: string = '') {
    // Gọi service với các tham số đã cung cấp
    this.orderService.listMyOrder(pageIndex, pageSize, nearDays, search).subscribe({
      next: (res: OrderResultService) => {
        this.loadingService.setOtherLoading('loaded');
        this.orderList = res.data.items;  // Gán kết quả trả về
        this.orderListNull = !this.orderList || this.orderList.length === 0;
        this.ListOrdersByStatus();  // Lọc theo trạng thái
      },
      error: () => {
        this.orderError = true;
      }
    });
  }

  // Phương thức lọc đơn hàng theo trạng thái
  ListOrdersByStatus() {
    this.orderTabs.forEach(tab => {
      tab.orders = this.orderList.filter(order => {
        const lastStatus = order.orderStatuses[order.orderStatuses.length - 1]; // Trạng thái cuối cùng
        return lastStatus && lastStatus.status === tab.status;
      });
      tab.ordersNull = tab.orders.length === 0;
    });

    this.cdRef.detectChanges();
  }

  // Phương thức tìm kiếm trong tab cụ thể
  onSearch(status: number) {
    const tab = this.orderTabs.find(tab => tab.status === status);
    if (tab) {
      // Cập nhật lại search text của tab và gọi phương thức lọc
      // this.loadOrders(this.currentPage, this.pageSize, this.selectedFilter, tab.searchText);
      this.filterOrders(tab);
    }
  }
  reset(status: number){
    const tab = this.orderTabs.find(tab => tab.status === status);
    if (!tab?.searchText) {
      this.loadOrders(this.currentPage, this.pageSize, this.selectedFilter);

    }
  }

  // Phương thức lọc đơn hàng theo chuỗi tìm kiếm
  filterOrders(tab: any) {
    tab.orders = this.orderList.filter(order => {
      const lastStatus = order.orderStatuses?.[order.orderStatuses.length - 1];
      return (
        lastStatus &&
        lastStatus.status === tab.status &&
        (
          order.orderDetails.some(detail => 
            detail.product.productName?.toLowerCase().includes(tab.searchText.toLowerCase())
          ) ||
          order.id.includes(tab.searchText)  // Lọc theo mã đơn hàng
        )
      );
    });
  
    tab.ordersNull = tab.orders.length === 0;
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