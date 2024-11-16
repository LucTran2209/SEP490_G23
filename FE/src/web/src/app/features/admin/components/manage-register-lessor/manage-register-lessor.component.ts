import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChangeStatusRequestShop, RequestShopDetailDto, RequestShopDetailResultService, RequestShopDto, RequestShopResultService } from '../../../../interfaces/request-shop.interface';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { StorageService } from '../../../../services/storage.service';
import { LoadingService } from '../../../../services/loading.service';
import { RentalShopService } from '../../../../services/rental-shop.service';

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
      data: RequestShopDto[]; // Đảm bảo kiểu là RequestShopDto[]
      currentPage: number;
      totalRequests: number;
    }[] = [
      { title: 'Chờ xử lý', status: 0, data: [], currentPage: this.currentPagePending, totalRequests: this.totalRequestsPending },
      { title: 'Đã phê duyệt', status: 1, data: [], currentPage: this.currentPageApproved, totalRequests: this.totalRequestsApproved },
      { title: 'Đã từ chối', status: 2, data: [], currentPage: this.currentPageRejected, totalRequests: this.totalRequestsRejected }
    ];
  
  
    ngOnInit(): void {
      this.loadRequests(0, this.currentPagePending);
      this.loadRequests(1, this.currentPageApproved);
      this.loadRequests(2, this.currentPageRejected);
    }
  
    // Phương thức tải dữ liệu yêu cầu theo trạng thái và trang
    loadRequests(status: number, pageIndex: number) {
      this.isloading = true;
      this.rentalShopService.requestShopList(pageIndex, this.pageSize).subscribe((res) => {
        this.loadingService.setOtherLoading('loaded');
        const filteredRequests = res.data.items.filter((item) => item.status === status);
  
        if (status === 0) {
          this.requestsPending = filteredRequests;
          this.totalRequestsPending = filteredRequests.length;
          this.updateRequestTabs();
          console.log("Danh Sách yêu cầu Chờ xử lý", this.requestsPending);
        } else if (status === 1) {
          this.requestsApproved = filteredRequests;
          this.totalRequestsApproved = filteredRequests.length;
          this.updateRequestTabs();
        } else if (status === 2) {
          this.requestsRejected = filteredRequests;
          this.totalRequestsRejected = filteredRequests.length;
          this.updateRequestTabs();
        }
  
        this.isloading = false;
      });
    }

    updateRequestTabs() {
      this.requestTabs = [
        { title: 'Chờ xử lý', status: 0, data: this.requestsPending, currentPage: this.currentPagePending, totalRequests: this.totalRequestsPending },
        { title: 'Đã phê duyệt', status: 1, data: this.requestsApproved, currentPage: this.currentPageApproved, totalRequests: this.totalRequestsApproved },
        { title: 'Đã từ chối', status: 2, data: this.requestsRejected, currentPage: this.currentPageRejected, totalRequests: this.totalRequestsRejected }
      ];
  
      // Bắt buộc Angular kiểm tra lại các thay đổi
      this.cdRef.detectChanges();
    }
  
    // Phương thức chuyển trang
    onPageChange(status: number, pageIndex: number) {
      if (status === 0) {
        this.currentPagePending = pageIndex;
      } else if (status === 1) {
        this.currentPageApproved = pageIndex;
      } else if (status === 2) {
        this.currentPageRejected = pageIndex;
      }
  
      this.loadRequests(status, pageIndex);
    }
    onSearch(){

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
        },
        (error) => {
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
