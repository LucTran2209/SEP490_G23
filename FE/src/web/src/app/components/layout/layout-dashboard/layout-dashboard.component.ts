import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { USER_ROLE } from '../../../utils/constant';
import { UserProfileService } from '../../../services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutDashboardComponent implements OnInit {
  isSidebarCollapsed: boolean = false;
  readonly USERROLE = USER_ROLE;
  notificationCount: number = 5;
  isShopSlected = false;
  isRenterSlected = false;
  shopId?: string;
  userRole: USER_ROLE = USER_ROLE.LESSOR; // Set your default role

  onToggleSidebar(collapsed: boolean): void {
    this.isSidebarCollapsed = collapsed;
    console.log(
      'Sidebar status: ',
      this.isSidebarCollapsed ? 'Collapsed' : 'Expanded'
    );
  }

  onAvatarClick(): void {
    console.log('Avatar clicked!');
    console.log(this.userRole);
  }

  constructor(
    private userProfileService: UserProfileService, 
    private router: Router,
  ) {
    this.router.events.subscribe(() => {
      this.checkActiveShopRoute();
      this.checkRenterRoute();
    });
  }
  ngOnInit(): void {
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
  this.shopId = this.userProfileService.rentalshopId;
  }
  hasLessorRole(): boolean {
    const role = this.userProfileService.roleCurrentUser;
    if (Array.isArray(role)) {
      return role.includes(USER_ROLE.LESSOR);
    }
    return role === USER_ROLE.LESSOR;
  }
  checkActiveShopRoute() {
    const currentUrl = this.router.url;
    this.isShopSlected = currentUrl.startsWith('/lessor/shop');
  }
  checkRenterRoute() {
    const currentUrl = this.router.url;
    this.isRenterSlected = currentUrl.startsWith('/lessor/order');
  }
}
