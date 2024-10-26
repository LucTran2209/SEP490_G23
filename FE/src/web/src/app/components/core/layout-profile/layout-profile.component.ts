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
  userName: string = '';

  constructor(
    private router: Router, 
    private userProfileService: UserProfileService
  ) {
    this.router.events.subscribe(() => {
      this.checkActiveAccountRoute();
    });
  }
  checkActiveAccountRoute() {
    const currentUrl = this.router.url;
    this.isAccountOpen = currentUrl.startsWith('/common/user/account');
  }
  ngOnInit(): void {
    const userCurrent = this.userProfileService.currentUser;
    this.userName = userCurrent?.UserName;
  }
}
