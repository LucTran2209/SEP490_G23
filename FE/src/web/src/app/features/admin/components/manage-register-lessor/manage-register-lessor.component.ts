import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChangeStatusRequestShop, RequestShopDetailDto, RequestShopDetailResultService, RequestShopDto, RequestShopResultService } from '../../../../interfaces/request-shop.interface';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { StorageService } from '../../../../services/storage.service';
import { LoadingService } from '../../../../services/loading.service';
import { RentalShopService } from '../../../../services/rental-shop.service';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-manage-register-lessor',
  templateUrl: './manage-register-lessor.component.html',
  styleUrl: './manage-register-lessor.component.scss'
})
export class ManageRegisterLessorComponent implements OnInit {
  // requestList: RequestShopDto[] = [];
  totalRequests = 0;     
  currentPage = 1;    
  pageSize = 10; 
  loading$?: Observable<StatusProcess>;
  isloading = false;
  searchText: string = '';
  isVisible : boolean = false;
  requestInformation!: RequestShopDetailDto;
  requestData!: ChangeStatusRequestShop;

  constructor(
    private rentalShopService: RentalShopService,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef,
    private loadingService: LoadingService,
    private messageService: MessageResponseService,
  ) 
  {
    this.loading$ = this.loadingService.status$;
  }
    // Danh sách yêu cầu theo trạng thái
    requestsPending: RequestShopDto[] = [];
    requestsApproved: RequestShopDto[] = [];
    requestsRejected: RequestShopDto[] = [];
  
    // Biến phân trang cho từng trạng thái
    currentPagePending = 1;
    currentPageApproved = 1;
    currentPageRejected = 1;
    totalRequestsPending = 0;
    totalRequestsApproved = 0;
    totalRequestsRejected = 0;
  
    // Cấu hình các tab yêu cầu
  requestTabs: { 
  title: string;
  status: number;
  data: RequestShopDto[];
  currentPage: number;
  totalRequests: number;
  searchText: string; // Từ khóa tìm kiếm riêng cho mỗi tab
}[] = [
  { title: 'Chờ xử lý', status: 0, data: [], currentPage: this.currentPagePending, totalRequests: this.totalRequestsPending, searchText: '' },
  { title: 'Đã phê duyệt', status: 1, data: [], currentPage: this.currentPageApproved, totalRequests: this.totalRequestsApproved, searchText: '' },
  { title: 'Đã từ chối', status: 2, data: [], currentPage: this.currentPageRejected, totalRequests: this.totalRequestsRejected, searchText: '' }
];
  
  
    ngOnInit(): void {
      this.loadRequests(0, this.currentPagePending);
      this.loadRequests(1, this.currentPageApproved);
      this.loadRequests(2, this.currentPageRejected);
      console.log(this.searchText);
    }
  
    // Phương thức tải dữ liệu yêu cầu theo trạng thái và trang
    loadRequests(status: number, pageIndex: number, search?: string) {
      console.log(`Loading requests for status ${status} with search: ${search}`);
      this.isloading = true;
      this.rentalShopService.requestShopList(pageIndex, this.pageSize, search).subscribe((res) => {
        this.loadingService.setOtherLoading('loaded');
        const filteredRequests = res.data.items.filter((item) => item.status === status);
  
        if (status === 0) {
          this.requestsPending = filteredRequests;
          this.totalRequestsPending = filteredRequests.length;
          // this.updateRequestTabs();
          // console.log("Danh Sách yêu cầu Chờ xử lý", this.requestsPending);
        } else if (status === 1) {
          this.requestsApproved = filteredRequests;
          this.totalRequestsApproved = filteredRequests.length;
          // this.updateRequestTabs();
        } else if (status === 2) {
          this.requestsRejected = filteredRequests;
          this.totalRequestsRejected = filteredRequests.length;
          // this.updateRequestTabs();
        }
        
        this.updateRequestTabs();
        this.isloading = false;
      });
    }

    updateRequestTabs() {
      this.requestTabs = [
        { 
          title: 'Chờ xử lý', 
          status: 0, 
          data: this.requestsPending, 
          currentPage: this.currentPagePending, 
          totalRequests: this.totalRequestsPending, 
          searchText: this.requestTabs.find(tab => tab.status === 0)?.searchText || '' 
        },
        { 
          title: 'Đã phê duyệt', 
          status: 1, 
          data: this.requestsApproved, 
          currentPage: this.currentPageApproved, 
          totalRequests: this.totalRequestsApproved, 
          searchText: this.requestTabs.find(tab => tab.status === 1)?.searchText || '' 
        },
        { 
          title: 'Đã từ chối', 
          status: 2, 
          data: this.requestsRejected, 
          currentPage: this.currentPageRejected, 
          totalRequests: this.totalRequestsRejected, 
          searchText: this.requestTabs.find(tab => tab.status === 2)?.searchText || '' 
        }
      ];
    
      // Buộc Angular kiểm tra lại các thay đổi
      this.cdRef.detectChanges();
    }
  
    // Phương thức chuyển trang
    onPageChange(status: number, pageIndex: number) {
      const tab = this.requestTabs.find(tab => tab.status === status);
      if (tab) {
        tab.currentPage = pageIndex;
        this.loadRequests(status, pageIndex);
      }
      this.updateRequestTabs(); // Gọi để cập nhật giao diện
    }
    onSearch(status: number) {
      const tab = this.requestTabs.find(tab => tab.status === status);
      if (tab) {
        tab.currentPage = 1;
        this.loadRequests(status, tab.currentPage, tab.searchText);
      }
    }
    reset(status: number){
      const tab = this.requestTabs.find(tab => tab.status === status);
      if (!tab?.searchText) {
        this.loadRequests(status, this.getPageIndexForStatus(status));

      }
    }
    viewDetail(id: string) {
      this.isVisible = true;
      this.rentalShopService.requestShopDetail(id).subscribe(
        (res: RequestShopDetailResultService) => {
            this.requestInformation = res.data;
            console.log('Request Details:', this.requestInformation);
            this.cdRef.detectChanges();
        }
      );
    }
    handleCloseModal(){
      this.isVisible = false;
    }
    handleAcceptRequest() {
      if (this.requestInformation && this.requestInformation.id) {
        this.requestData = { id: this.requestInformation.id, status: 1 };
        this.changeStatus(this.requestData.status);
      }
      this.isVisible = false;
    }
  
    handleRejectRequest() {
      if (this.requestInformation && this.requestInformation.id) {
        this.requestData = { id: this.requestInformation.id, status: 2 };
        this.changeStatus(this.requestData.status);
      }
      this.isVisible = false;
    }
  
    changeStatus(status: number) {
      this.rentalShopService.changeStatusRequestShop(this.requestData).subscribe(
        () => {
          this.loadRequests(status, this.getPageIndexForStatus(status));
          this.loadRequests(0, this.getPageIndexForStatus(0));
          if(status == 1){
            this.messageService.showSuccess('Bạn Đã Duyệt Đơn Yêu Cầu Thành Công!');
          }else{
            this.messageService.showSuccess('Bạn Đã Từ Chối Đơn Yêu Cầu Thành Công!');
          }
        },
        (error) => {
          this.messageService.handleError('Bạn Đã Xét Duyệt Đơn Yêu Cầu Thất Bại!');
          console.error('Error changing status:', error);
        }
      );
    }
  
    getPageIndexForStatus(status: number): number {
      if (status === 0) return this.currentPagePending;
      if (status === 1) return this.currentPageApproved;
      if (status === 2) return this.currentPageRejected;
      return 1;
    }
}
