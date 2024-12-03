import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { MyOrderDetailDto, MyOrderOutputDto, OrderDetailResultService, OrderResultService, OrderStatus } from '../../../../interfaces/order.interface';
import { UserService } from '../../../../services/user.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { LoadingService } from '../../../../services/loading.service';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedBackInputDto } from '../../../../interfaces/feedback.interface';
import { MessageResponseService } from '../../../../services/message-response.service';
import { ORDER_STATUS } from '../../../../utils/constant';

@Component({
  selector: 'app-list-my-order',
  templateUrl: './list-my-order.component.html',
  styleUrl: './list-my-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMyOrderComponent implements OnInit {
  selectedFilter = 7;
  isVisible : boolean = false;
  isVisibleCancel: boolean = false;
  isVisibleReceive: boolean = false;
  isVisibleReturn: boolean = false;
  username: string = '';
  totalOrders = 0;     
  currentPage = 1;    
  pageSize = 100;  
  orderList: MyOrderOutputDto[] = [];
  orderListNull = true;
  orderError = false;
  orderInformation!: MyOrderDetailDto;
  loading = true;
  loading$?: Observable<StatusProcess>;
  searchText: string = '';
  statusOrder: number = 0;
  selectedTab = 0;
  orderId: string = '';
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
    isShowBtn2: boolean;
    isShowBtn3: boolean;
    isShowBtn4: boolean;
  }[] = [
    { title: 'CHỜ XÁC NHẬN', status: 0, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...', isShowBtn1: false, isShowBtn2: true, isShowBtn3: false, isShowBtn4: false, },
    { title: 'CHỜ THANH TOÁN', status: 1, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false, isShowBtn2: true, isShowBtn3: false, isShowBtn4: false, },
    { title: 'ĐÃ THANH TOÁN', status: 2, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false, isShowBtn2: true, isShowBtn3: false, isShowBtn4: false, },
    { title: 'CHỜ GIAO HÀNG', status: 3, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false, isShowBtn2: false, isShowBtn3: true, isShowBtn4: false, },
    { title: 'ĐÃ NHẬN HÀNG', status: 4, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false, isShowBtn2: false, isShowBtn3: false, isShowBtn4: true, },
    { title: 'ĐANG TRẢ HÀNG', status: 5, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false, isShowBtn2: false, isShowBtn3: false, isShowBtn4: false, },
    { title: 'HOÀN THÀNH', status: 6, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: true, isShowBtn2: false, isShowBtn3: false, isShowBtn4: false, },
    { title: 'HỦY ĐƠN', status: 7, currentPage: 1, totalOrders: 0, searchText: '', orders: [], ordersNull: true, placeholder: 'Tìm kiếm...',isShowBtn1: false, isShowBtn2: false, isShowBtn3: false, isShowBtn4: false, }
  ];
  ngOnInit() {
    this.loadingService.setLoading();
    // this.loadOrders(this.currentPage, this.pageSize);
    this.route.queryParamMap.subscribe(queryParams => {
      let status = queryParams.get('status'); // Lấy tham số "status" từ URL
      console.log('Current status from URL:', status); // Debug log
  
      if (status === null) {
        // Nếu không có tham số status trong URL, gán giá trị mặc định là 0
        status = '0';
        // Cập nhật URL với query params mặc định
        this.router.navigate([], {
          queryParams: { status: status },
          queryParamsHandling: 'merge',
          relativeTo: this.route
        });
      }
  
      // Cập nhật giá trị statusOrder từ URL
      this.statusOrder = parseInt(status, 10);
  
      // Xác định tab tương ứng với status
      const tabIndex = this.orderTabs.findIndex(tab => tab.status === this.statusOrder);
      if (tabIndex !== -1) {
        this.selectedTab = tabIndex; // Cập nhật tab được chọn
        this.loadOrders(this.orderTabs[tabIndex].currentPage, this.pageSize, this.orderTabs[tabIndex].searchText);
      }
    });
  }
  onTabChange(index: number): void {
    console.log('Tab changed to index:', index); // Log để kiểm tra index
    const tab = this.orderTabs[index];          // Lấy tab dựa trên index
  
    if (tab) {
      console.log('Tab details:', tab);         // Log thông tin tab để kiểm tra
      this.selectedTab = index;                // Cập nhật tab hiện tại
      this.router.navigate([], {
        queryParams: { status: tab.status },    // Cập nhật status vào query params
        queryParamsHandling: 'merge',          // Giữ các query params khác
        relativeTo: this.route                 // Route hiện tại
      });
      this.loadOrders(tab.currentPage, this.pageSize, tab.searchText);
    }
  }
  
  loadOrders(pageIndex: number, pageSize: number, search: string = '') {
    // Gọi service với các tham số đã cung cấp
    this.orderService.listMyOrder(pageIndex, pageSize, search).subscribe({
      next: (res: OrderResultService) => {
        this.loadingService.setOtherLoading('loaded');
        this.orderList = res.data.items;  // Gán kết quả trả về
        this.orderListNull = !this.orderList || this.orderList.length === 0;
        this.pageSize = res.data.totalCount;
        this.ListOrdersByStatus();  // Lọc theo trạng thái
        console.log(res.data.items);
        this.cdRef.markForCheck();
      },
      error: () => {
        this.orderError = true;
        this.cdRef.markForCheck();
      }
    });
  }

  // Phương thức lọc đơn hàng theo trạng thái
  ListOrdersByStatus() {
    const orderMap = new Map<number, MyOrderOutputDto[]>();
  
    // Nhóm đơn hàng theo trạng thái lớn nhất
    this.orderList.forEach((order) => {
      if (order.orderStatuses && order.orderStatuses.length > 0) {
        // Lấy trạng thái lớn nhất
        const lastStatus = Math.max(...order.orderStatuses.map(status => status.status));
  
        if (!orderMap.has(lastStatus)) {
          orderMap.set(lastStatus, []);
        }
        orderMap.get(lastStatus)!.push(order);
      }
    });
  
    // Gán dữ liệu cho các tab
    this.orderTabs.forEach((tab) => {
      tab.orders = orderMap.get(tab.status) || [];
      tab.ordersNull = tab.orders.length === 0;
    });
  }
  // Phương thức tìm kiếm trong tab cụ thể
  onSearch(status: number) {
    const tab = this.orderTabs.find((t) => t.status === status);
    if (tab) {
      tab.orders = this.orderList.filter((order) => {
        if (!order.orderStatuses || order.orderStatuses.length === 0) {
          return false;
        }
        const lastStatus = Math.max(...order.orderStatuses.map(s => s.status));
        return (
          lastStatus === status &&
          (order.orderDetails.some((detail) =>
            detail.product.productName.toLowerCase().includes(tab.searchText.toLowerCase())
          ) ||
            order.id.includes(tab.searchText))
        );
      });
      tab.ordersNull = tab.orders.length === 0;
      this.cdRef.markForCheck();
    }
  }
  reset(status: number){
    const tab = this.orderTabs.find(tab => tab.status === status);
    if (!tab?.searchText) {
      this.loadOrders(this.currentPage, this.pageSize, '');

    }
  }

  // Phương thức lọc đơn hàng theo chuỗi tìm kiếm
  filterOrders(tab: any) {
    tab.orders = this.orderList.filter(order => {
      if (!order.orderStatuses || order.orderStatuses.length === 0) {
        return false; // Không có trạng thái thì bỏ qua
      }
  
      // Lấy trạng thái lớn nhất trong danh sách orderStatuses
      const lastStatus = Math.max(...order.orderStatuses.map(status => status.status));
  
      // Lọc theo trạng thái và chuỗi tìm kiếm
      return (
        lastStatus === tab.status &&
        (
          order.orderDetails.some(detail => 
            detail.product.productName?.toLowerCase().includes(tab.searchText.toLowerCase())
          ) ||
          order.id.toLowerCase().includes(tab.searchText.toLowerCase()) // Lọc theo mã đơn hàng (không phân biệt hoa thường)
        )
      );
    });
  
    // Cập nhật trạng thái rỗng của tab
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
          if (tab.status === 6) {
            tab.isShowBtn1 = false;
          }
        });
        this.loadOrders(this.currentPage, this.pageSize);
      },
      error: (error) => {
        this.messageService.handleError('Đánh Giá Thất Bại!', 3000);
        this.loadOrders(this.currentPage, this.pageSize);
      }
    });
  }
  showCancelForm(orderId: string){
    this.isVisibleCancel = true;
    this.orderId = orderId;
    console.log(this.orderId);
  }
  handleCloseCancelForm(){
    this.isVisibleCancel = false;
  }
  changeStatus(status: OrderStatus) {
    if (!this.orderId) {
      this.messageService.handleError('Không tìm thấy đơn hàng cần hủy!');
      return;
    }
  
    // Tạo FormData
    const formData = new FormData();
    formData.append('Id', '');
    formData.append('OrderId', this.orderId);
    formData.append('Message', status.message);
    formData.append('Status', `${ORDER_STATUS.CANCEL}`);
    formData.append('FileAttach', '');
  
    // Hiển thị trạng thái tải
    this.loadingService.setLoading();
  
    // Gửi yêu cầu hủy đơn hàng
    this.orderService.requestOrderStatus(formData).subscribe({
      next: () => {
        this.messageService.showSuccess('Hủy đơn hàng thành công!');
        this.handleCloseCancelForm();
        this.loadOrders(this.currentPage, this.pageSize); // Tải lại danh sách đơn hàng
      },
      error: (err) => {
        console.error('Hủy đơn hàng thất bại:', err); // Ghi log lỗi
        this.messageService.handleError('Hủy đơn hàng thất bại!');
      },
      complete: () => {
        this.loadingService.setOtherLoading('loaded'); // Tắt trạng thái tải
      },
    });
  }
  showConfirmReceiveForm(orderId: string){
    this.isVisibleReceive = true;
    this.orderId = orderId;
  }
  showConfirmReturnForm(orderId: string){
    this.isVisibleReturn = true;
    this.orderId = orderId;
  }
  handleCloseReceiveForm(){
    this.isVisibleReceive = false;
  }
  handleCloseReturnForm(){
    this.isVisibleReturn = false;
  }
  changeStatusReceive(status: OrderStatus) {
    // Tạo FormData
    const formData = new FormData();
    formData.append('Id', '');
    formData.append('OrderId', this.orderId);
    formData.append('Message', status.message);
    formData.append('Status', `${ORDER_STATUS.REFUND}`);
    formData.append('FileAttach', '');
  
    // Hiển thị trạng thái tải
    this.loadingService.setLoading();
  
    // Gửi yêu cầu hủy đơn hàng
    this.orderService.requestOrderStatus(formData).subscribe({
      next: () => {
        this.messageService.showSuccess('Xác nhận thành công!');
        this.handleCloseReceiveForm();
        this.loadOrders(this.currentPage, this.pageSize); // Tải lại danh sách đơn hàng
      },
      error: (err) => {
        this.messageService.handleError('Xác nhận thất bại!');
      },
      complete: () => {
        this.loadingService.setOtherLoading('loaded'); // Tắt trạng thái tải
      },
    });
  }
  changeStatusReturn(status: OrderStatus) {
    // Tạo FormData
    const formData = new FormData();
    formData.append('Id', '');
    formData.append('OrderId', this.orderId);
    formData.append('Message', status.message);
    formData.append('Status', `${ORDER_STATUS.DEPOSIT_REFUND}`);
    formData.append('FileAttach', '');
  
    // Hiển thị trạng thái tải
    this.loadingService.setLoading();
  
    // Gửi yêu cầu hủy đơn hàng
    this.orderService.requestOrderStatus(formData).subscribe({
      next: () => {
        this.messageService.showSuccess('Xác nhận thành công!');
        this.handleCloseReturnForm();
        this.loadOrders(this.currentPage, this.pageSize); // Tải lại danh sách đơn hàng
      },
      error: (err) => {
        this.messageService.handleError('Xác nhận thất bại!');
      },
      complete: () => {
        this.loadingService.setOtherLoading('loaded'); // Tắt trạng thái tải
      },
    });
  }
}