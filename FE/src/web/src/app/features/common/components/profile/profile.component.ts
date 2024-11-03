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
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user!: UserOutputDto;
  userInformation!: UserUpdateInputDto;
  userid: string = '';
  isVisible: boolean = false;
  title: string = '';
  showAlert: boolean = false;
  alertType: 'success' | 'error' = 'success';
  alertMessage: string = '';
  userError = false;
  loading = true; 
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
    private message: NzMessageService,
    private router: Router,
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
      dateOfBirth: this.user.dateOfBirth,
      avatarPersonal: null,
    }
    // console.log(this.userInformation);
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
        window.location.reload();
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
    this.userid = this.userProfileService.UserId;
    console.log(this.userid);
    this.userService.viewProfile(this.userid).subscribe({
      next: (res: ProfileResultService) => {
        this.loading = false;
        this.user = res.data;
        this.userProfileService.setAvatar(this.user.avatarPersonal);
        console.log(this.user);
      },
      error: () => {
        this.loading = false;
        this.userError = true; // Show NzResult on error
      }
      });
  }
}
