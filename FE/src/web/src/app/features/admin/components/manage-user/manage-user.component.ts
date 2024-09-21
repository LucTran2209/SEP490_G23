import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from '../../../../services/user.service';
import { ListUserOutputDto, UserResultService } from '../../../../interfaces/user.interface';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {
  userList: ListUserOutputDto[] = [];
  searchText: string = '';
  constructor(private modal: NzModalService, private userService: UserService) {}
  ngOnInit(): void{

  }
  loadUsers(){
    this.userService.listUser().subscribe((res: UserResultService) =>{
      this.userList = res.datas;
    });
  }
  onSearch() {
  }
  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Ngừng Hoạt Động',
      nzContent: '<b style="color: red;">Bạn chắc chắn muốn người dùng này ngừng hoạt động không?</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
