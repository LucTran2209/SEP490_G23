import { Component, Input, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { UserInputDto } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  isVisible : boolean = false;
  title: string = '';
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.title = 'Chỉnh sửa thông tin của Nguyễn Văn A';
  }
  showEditProfile(){
    this.isVisible = true;
  }
  handleCloseModal(){
    this.isVisible = false;
  }
  saveUser(user: UserInputDto){
    this.userService.updateProfile(user).subscribe(() => {
    });
  }

}
