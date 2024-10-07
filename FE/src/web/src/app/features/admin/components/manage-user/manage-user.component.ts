import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../services/user.service';
import { ListUserOutputDto, UserResultService, ActiveUserInputDto, UserInputDto } from '../../../../interfaces/user.interface';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {
  userList: ListUserOutputDto[] = [];
  searchText: string = '';
  userActive!: ActiveUserInputDto;
  userInformation!: UserInputDto;
  isVisible : boolean = false;
  title: string = '';
  constructor(private modal: NzModalService, private userService: UserService) {}
  ngOnInit(): void{
    this.loadUsers();
    this.title = 'Điền Thông Tin Của Người Mới'
  }
  loadUsers(){
    this.userService.listUser().subscribe((res: UserResultService) =>{
      this.userList = res.datas.list;
    });
  }
  onSearch() {
    this.userService.searchUser().subscribe((res: UserResultService) =>{
      this.userList = res.datas.list;
    }); 
  }
  showInviteUser(){
    this.isVisible = true;
  }
  handleCloseModal(){
    this.isVisible = false;
  }
  saveUser(user: UserInputDto){
    this.userService.addUser(user).subscribe(() => {
      this.loadUsers();
    });
  }
  showDeleteConfirm(userName: string): void {
    this.modal.confirm({
      nzTitle: 'Ngừng Hoạt Động',
      nzContent: '<b style="color: red;">Bạn chắc chắn muốn người dùng này ngừng hoạt động không?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
      {
        this.userActive.userName = userName;
        this.userActive.isActive = true;
        this.userService.activeUser(this.userActive).subscribe(() =>{
          this.loadUsers();
        });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
