import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import {
  ProfileResultService,
  UserOutputDto,
  UserUpdateInputDto
} from '../../../../interfaces/user.interface';
import { ImageFileService } from '../../../../services/image-file.service';
import { LoadingService } from '../../../../services/loading.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { UserService } from '../../../../services/user.service';

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
  loading$?: Observable<StatusProcess>;
  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageResponseService,
  ) {
    this.loading$ = this.loadingService.status$;
  }
  ngOnInit() {
    this.loadingService.setLoading();
    this.title = 'Chỉnh sửa Hồ Sơ';
    this.loadUser();
    
  }
  async showEditProfile() {
      const response = await fetch(this.user.avatarPersonal);
      const blob = await response.blob();
      const fileName = 'avatar.png'; // Đặt tên cho file tải về
      const avatar = new File([blob], fileName, { type: blob.type });
    
    this.userInformation = {
      id: this.user.id,
      fullName: this.user.fullName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      address: this.user.address,
      gender: this.user.gender,
      dateOfBirth: this.user.dateOfBirth,
      avatarPersonal: avatar,
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
        this.messageService.showSuccess('Cập Nhật Hồ Sơ Thành Công!');
        this.handleCloseModal();
        this.loadUser();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
    this.loadingService.setLoading();
    this.userid = this.userProfileService.UserId;
    console.log(this.userid);
    this.userService.viewProfile(this.userid).subscribe({
      next: (res: ProfileResultService) => {
        this.loadingService.setOtherLoading('loaded');
        this.user = res.data;
        this.userProfileService.setAvatar(this.user.avatarPersonal);
        console.log(this.user);
      },
      error: () => {
        this.userError = true; // Show NzResult on error
      }
      });
  }
}
