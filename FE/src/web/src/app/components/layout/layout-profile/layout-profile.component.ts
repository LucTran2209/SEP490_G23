import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserProfileService } from '../../../services/user-profile.service';
import { UserService } from '../../../services/user.service';
import { ProfileResultService } from '../../../interfaces/user.interface';
import { USER_ROLE } from '../../../utils/constant';
import { MessageResponseService } from '../../../services/message-response.service';

@Component({
  selector: 'app-layout-profile',
  templateUrl: './layout-profile.component.html',
  styleUrls: ['./layout-profile.component.scss']
})
export class LayoutProfileComponent implements OnInit {
  isAccountOpen = false;
  isPaymentOpen = false;
  isOrderSlected= false;
  userName?: string;
  avatarPersonal?: string;
  readonly USERROLE = USER_ROLE;
  userRole: USER_ROLE = USER_ROLE.LESSOR;

  constructor(
    private router: Router, 
    private userProfileService: UserProfileService,
    private messageResponseService: MessageResponseService,
    private userService: UserService,
  ) {
    this.router.events.subscribe(() => {
      this.checkActiveAccountRoute();
      this.checkActiveOrderRoute();
    });
  }
  checkActiveAccountRoute() {
    const currentUrl = this.router.url;
    this.isAccountOpen = currentUrl.startsWith('/common/user/account');
    this.isPaymentOpen = currentUrl.startsWith('/common/user/payment');
  }
  checkActiveOrderRoute() {
    const currentUrl = this.router.url;
    this.isOrderSlected = currentUrl.startsWith('/common/user/order');
  }
  ngOnInit(): void {
    const userCurrent = this.userProfileService.currentUser;
    if(userCurrent){
      this.checkRole();
      this.userName = userCurrent?.UserName;
      this.avatarPersonal = userCurrent?.Avatar;
    }else{
      this.messageResponseService.handleError('Bạn Cần Đăng Nhập Để Truy Cập Trang này');
      this.router.navigateByUrl('/auth/login');
    }
  }
  checkRole(){
    const role = this.userProfileService.roleCurrentUser;
  
  // Check if the role is valid and assign it to userRole
  if (typeof role === 'string' && Object.values(USER_ROLE).includes(role as USER_ROLE)) {
    this.userRole = role as USER_ROLE;
  } else if (Array.isArray(role) && role.length > 0) {
    // If the role is an array, you may want to handle which role to set (e.g., the first role)
    this.userRole = role[0] as USER_ROLE;
  } else {
    // Handle the case where role is undefined or invalid if needed
    console.warn('Invalid or undefined user role');
  }
  }
}
