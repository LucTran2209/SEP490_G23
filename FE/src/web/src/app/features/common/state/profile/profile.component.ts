import {
  ChangeDetectorRef,
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
    private cdRef: ChangeDetectorRef,
  ) {
    this.loading$ = this.loadingService.status$;
  }
  ngOnInit() {
    this.loadingService.setLoading();
    this.title = 'Chỉnh sửa Hồ Sơ';
    this.loadUser();
    
  }
  async showEditProfile() {
    let avatar: File | null = null;
    if (typeof this.user.avatarPersonal === 'string' && this.user.avatarPersonal) {
      const response = await fetch(this.user.avatarPersonal);
      const blob = await response.blob();
      
      // Tạo đối tượng File từ blob
      avatar = new File([blob], 'avatar.png', { type: blob.type });
    }
    
    this.userInformation = {
      id: this.user.id,
      fullName: this.user.fullName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      address: this.user.address,
      gender: this.user.gender,
      dateOfBirth: this.user.dateOfBirth,
      avatarPersonal: avatar || null,
    }
    console.log(this.userInformation);
    this.isVisible = true;
    this.cdRef.detectChanges();
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
        this.messageService.handleError('Cập Nhật Hồ Sơ Thất Bại!');
        console.error('Failed to create user');
      }

    });
  }
  loadUser() {
    this.loadingService.setLoading();
    this.userid = this.userProfileService.UserId ?? '';
    this.userService.viewProfile(this.userid).subscribe({
      next: (res: ProfileResultService) => {
        this.loadingService.setOtherLoading('loaded');
        this.user = res.data;
        this.userProfileService.setAvatar(this.user.avatarPersonal);
        console.log(this.user);
        this.userError = false; 
      },
      error: () => {
        this.userError = true; // Show NzResult on error
      }
      });
  }
}
