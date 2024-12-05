import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../services/user.service';

import { UserOutputDto, UserResultService, ActiveUserInputDto, UserInputDto } from '../../../../interfaces/user.interface';
import { StorageService } from '../../../../services/storage.service';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../../../../store/app.state';
import * as AdminActions from '../../state/admin.actions';
import { Observable } from 'rxjs';
import { selectLoading, selectUsers } from '../../state/admin.selectors';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { LoadingService } from '../../../../services/loading.service';
import { MessageResponseService } from '../../../../services/message-response.service';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {
  userList: UserOutputDto[] = [];
  filteredUsers: UserOutputDto[] = [];
  searchText: string = '';
  userActive!: ActiveUserInputDto;
  userInformation!: UserInputDto;
  isVisible : boolean = false;
  title: string = '';
  totalUsers = 0;     
  currentPage = 1;    
  pageSize = 10;      
  loading = false; 
  isActive: boolean = true;
  isEditMode: boolean = false;
  showAlert: boolean = false;
  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  visibleName = false;
  visibleEmail = false;
  visiblePhoneNumber = false;
  visibleAddress = false;
  visibleGender = false;
  visibleDateOfBirth = false;
  selectedGender: string[] = [];
  loading$?: Observable<StatusProcess>;
  isloading = false;
  searchFullName: string = '';
  searchEmail: string = '';
  searchPhoneNumber: string = '';
  searchAddress: string = '';
  searchGender: string = '';
  searchDateOfBirth: string = '';
  filterGender = [
    { text: 'Nam', value: 'male' },
    { text: 'Nữ', value: 'female' }
  ];

  constructor(
    private modal: NzModalService, 
    private userService: UserService,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef,
    private store: Store<FeatureAppState>,
    private messageService: MessageResponseService,
    private loadingService: LoadingService,
  ) 
  {
    this.loading$ = this.loadingService.status$;
  }
  
  ngOnInit(): void{
    this.loadUsers(this.currentPage, this.pageSize);
    this.title = 'Điền Thông Tin Của Người Mới';
    // this.userResult$.subscribe(users => {
    //   console.log('User List:', users);
    // });
  }
  errorMessage: string = '';
  loadUsers(pageIndex: number, pageSize: number, FullName?: string, Email?: string, PhoneNumber?: string, Address?: string, Gender?: string, DateOfBirth?: string){
    this.isloading = true;
    this.userService.listUser(pageIndex, pageSize, FullName, Email, PhoneNumber, Address, Gender, DateOfBirth).subscribe((res: UserResultService) =>{
      this.userList = res.data.items;
      this.totalUsers = res.data.totalCount;
      this.isloading = false;
      this.loadingService.setOtherLoading('loaded');
      console.log(res)
    });
  }
  onSearch() {
    this.loadUsers(
      this.currentPage,
      this.pageSize,
      this.searchFullName,
      this.searchEmail,
      this.searchPhoneNumber,
      this.searchAddress,
      this.searchGender,
      this.searchDateOfBirth
    );
  }
  onFilterChange(selected: string[]): void {
    this.selectedGender = selected;
    this.loadUsers(this.currentPage, this.pageSize, this.searchFullName, this.searchEmail, this.searchPhoneNumber, this.searchAddress, this.selectedGender.length > 0 ? this.selectedGender.join(',') : undefined);
  }
  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.loadUsers(this.currentPage, this.pageSize);
  }

  showInviteUser(){
    this.isVisible = true;
  }
  handleCloseModal(){
    this.isVisible = false;
  }
  handleCreateUser(userData: any): void {

    this.userService.addUser(userData).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Tạo Tài Khoản Mới Thành Công!', 3000);
        this.handleCloseModal();
        this.loadUsers(this.currentPage, this.pageSize);
        
      },
      error: (error) => {
        this.alertMessage = 'Tạo Tài Khoản Mới Thất Bại!';
          this.alertType = 'error';
          this.showAlert = true;
          setTimeout(() => {
            this.handleCloseModal();
            this.showAlert = false;
          }, 5000);
        console.error('Failed to create user');
      }
    });
  }
  showDeleteConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: 'Ngừng Hoạt Động',
      nzContent: '<b style="color: red;">Bạn chắc chắn muốn cấm tài khoản này không?</b>',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
      {
        this.userActive = { id: id, isActive: false };
        console.log(this.userActive);
        this.userService.activeUser(this.userActive).subscribe(
          (response) => {
            this.messageService.showSuccess('Cấm tài khoản thành công!', 3000);
            console.log(response);
            this.loadUsers(this.currentPage, this.pageSize);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      nzCancelText: 'Không',
      nzOnCancel: () => this.messageService.showInfo('Bạn đã từ bỏ cấm tài khoản này!', 3000)
    });
  }
}
