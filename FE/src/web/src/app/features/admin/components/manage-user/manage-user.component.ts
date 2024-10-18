import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../services/user.service';

import { ListUserOutputDto, UserResultService, ActiveUserInputDto, UserInputDto } from '../../../../interfaces/user.interface';
import { StorageService } from '../../../../services/storage.service';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../../../../store/app.state';
import * as AdminActions from '../../state/admin.actions';
import { Observable } from 'rxjs';
import { selectLoading, selectUsers } from '../../state/admin.selectors';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {
  userList: ListUserOutputDto[] = [];
  res!: UserResultService;
  filteredUsers: ListUserOutputDto[] = [];
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
  userResult$!: Observable<ListUserOutputDto[]>;
  loading$!: Observable<boolean>;
  constructor(private modal: NzModalService, 
    private userService: UserService,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef,
    private store: Store<FeatureAppState>
  ) 
  {
    this.userResult$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
  }
  ngOnInit(): void{
    this.loadUsers(this.currentPage, this.pageSize);
    this.title = 'Điền Thông Tin Của Người Mới';
    this.userResult$.subscribe(users => {
      console.log('User List:', users);
    });
  }
  errorMessage: string = '';
  loadUsers(pageIndex: number, pageSize: number){
    this.loading = true;
    this.userService.listUser(pageIndex, pageSize).subscribe((res: UserResultService) =>{
      this.userList = res.data.items;
      this.totalUsers = res.data.totalCount;
      this.loading = false;
      console.log(res)
    });
    // this.store.dispatch(AdminActions.load_users({ pageIndex, pageSize }));
  }
  onSearch() {
    this.userService.searchUser().subscribe((res: UserResultService) =>{
      this.userList = res.data.items;
      this.totalUsers = res.data.totalCount;
      this.loading = false;
    }); 
  }
  // Phương thức để xử lý khi trang thay đổi
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
  // Hàm xử lý khi nhận sự kiện tạo người dùng mới từ component con
  handleCreateUser(userData: any): void {

    this.userService.addUser(userData).subscribe({
      next: (response) => {
        console.log('User created successfully!');
        this.loadUsers(this.currentPage, this.pageSize); // Load lại danh sách người dùng sau khi tạo thành công
        
      },
      error: (error) => {
        console.error('Failed to create user');
      }
    });
  }
  showDeleteConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: 'Ngừng Hoạt Động',
      nzContent: '<b style="color: red;">Bạn chắc chắn muốn người dùng này ngừng hoạt động không?</b>',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
      {
        this.userActive = { id: id, isActive: false };
        console.log(this.userActive);
        this.userService.activeUser(this.userActive).subscribe(
          (response) => {
            console.log(response);
            this.loadUsers(this.currentPage, this.pageSize);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      nzCancelText: 'Không',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
