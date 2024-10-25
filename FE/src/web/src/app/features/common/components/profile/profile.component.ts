import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ProfileResultService,
  UserInputDto,
  UserOutputDto,
  UserResultService,
  UserUpdateInputDto,
} from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/user.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user!: UserOutputDto;
  userInformation!: UserUpdateInputDto;
  username: string = '';
  isVisible: boolean = false;
  title: string = '';
  showAlert: boolean = false;
  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
    private message: NzMessageService,
  ) {}
  ngOnInit() {
    
    this.title = 'Chỉnh sửa Hồ Sơ';
    this.loadUser();
  }
  showEditProfile() {
    this.userInformation = {
      id: this.user.id,
      fullName: this.user.fullName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      address: this.user.address,
      gender: this.user.gender,
      dateOfBirth: this.user.dateOfBirth
    }
    console.log(this.userInformation);
    this.isVisible = true;
  }
  handleCloseModal() {
    this.isVisible = false;
  }
  updateUser(user: any) {
    console.log(this.userInformation);
    this.userService.updateProfile(user).subscribe({
      next: (response) => {
        this.message.success('Cập Nhật Hồ Sơ Thành Công!');
        this.handleCloseModal();
        this.loadUser();
        
      },
      error: (error) => {
        this.alertMessage = 'Cập Nhật Hồ Sơ Thất Bại!';
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
  loadUser() {
    const userCurrent = this.userProfileService.currentUser;
    this.username = userCurrent?.UserName;
    this.userService
      .viewProfile(this.username)
      .subscribe((res: ProfileResultService) => {
        this.user = res.data;
        console.log(this.user);
      });
  }
}
