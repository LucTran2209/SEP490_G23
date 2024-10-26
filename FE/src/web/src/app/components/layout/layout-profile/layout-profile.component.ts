import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-layout-profile',
  templateUrl: './layout-profile.component.html',
  styleUrls: ['./layout-profile.component.scss']
})
export class LayoutProfileComponent implements OnInit {
  isAccountOpen = false;
  isOrderSlected= false;
  userName: string = '';

  constructor(
    private router: Router, 
    private userProfileService: UserProfileService
  ) {
    this.router.events.subscribe(() => {
      this.checkActiveAccountRoute();
      this.checkActiveOrderRoute();
    });
  }
  checkActiveAccountRoute() {
    const currentUrl = this.router.url;
    this.isAccountOpen = currentUrl.startsWith('/common/user/account');
  }
  checkActiveOrderRoute() {
    const currentUrl = this.router.url;
    this.isOrderSlected = currentUrl.startsWith('/common/user/order');
  }
  ngOnInit(): void {
    const userCurrent = this.userProfileService.currentUser;
    this.userName = userCurrent?.UserName;
  }
}
