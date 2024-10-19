import { Component, Input, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { ProfileResultService, UserInputDto, UserOutputDto, UserResultService } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/user.service';
import { UserProfileService } from '../../../../services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  user!: UserOutputDto;
  username: string = '';
  isVisible : boolean = false;
  title: string = '';
  constructor(private userService: UserService, private userProfileService: UserProfileService) {}
  ngOnInit() {
    this.title = 'Chỉnh sửa thông tin của Nguyễn Văn A';
    this.loadUser();
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
  loadUser(){
    const userCurrent = this.userProfileService.currentUser;
    this.username = userCurrent?.UserName;
    this.userService.viewProfile(this.username).subscribe((res: ProfileResultService) =>{
      this.user = res.data;
      console.log(this.user);
    })
  }


}
