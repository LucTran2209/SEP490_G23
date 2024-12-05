import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../../features/auth/state/auth.actions';
import { IPayLoad } from '../../../interfaces/account.interface';
import { StorageService } from '../../../services/storage.service';
import { UserProfileService } from '../../../services/user-profile.service';
import { FeatureAppState } from '../../../store/app.state';
import { LocalStorageKey, USER_ROLE } from '../../../utils/constant';

@Component({
  selector: 'app-navbar-headear',
  templateUrl: './navbar-headear.component.html',
  styleUrl: './navbar-headear.component.scss',
})
export class NavbarHeadearComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Input() notificationCount: number = 5;
  user?: IPayLoad;
  readonly USERROLE = USER_ROLE;
  userRole: USER_ROLE = USER_ROLE.LESSOR;
  avatarPersonal?: string;
  rentalShopId?: string;
  userName?: string;

  @Output() toggleSidebar = new EventEmitter<boolean>();
  @Output() avatarClick = new EventEmitter<void>();

  constructor(
    private router: Router,
    private storageService: StorageService,
    private store: Store<FeatureAppState>,
    private userProfileService: UserProfileService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.handleAssginInfo();
    this.checkRole();
    this.avatarPersonal = this.userProfileService.avatar;
    this.rentalShopId = this.userProfileService.rentalshopId;
    this.userName = this.userProfileService.currentUser?.UserName;
  }
  /**
   * test
   */

  openNotifcationAvailable() {}

  handleToggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebar.emit(this.isCollapsed);
  }
  logout() {
    this.store.dispatch(logout());
    this.cdRef.markForCheck();
  }

  handleAssginInfo() {
    const userData = this.storageService.get(LocalStorageKey.currentUser);
    if (userData) {
      this.user = JSON.parse(userData) as IPayLoad;
    }
  }

  checkRole() {
    const role = this.userProfileService.roleCurrentUser;

    // Check if the role is valid and assign it to userRole
    if (
      typeof role === 'string' &&
      Object.values(USER_ROLE).includes(role as USER_ROLE)
    ) {
      this.userRole = role as USER_ROLE;
    } else if (Array.isArray(role) && role.length > 0) {
      // If the role is an array, you may want to handle which role to set (e.g., the first role)
      this.userRole = role[0] as USER_ROLE;
    } else {
      // Handle the case where role is undefined or invalid if needed
      console.warn('Invalid or undefined user role');
    }
  }
  hasLessorRole(): boolean {
    const role = this.userProfileService.roleCurrentUser;
    if (Array.isArray(role)) {
      return role.includes(USER_ROLE.LESSOR);
    }
    return role === USER_ROLE.LESSOR;
  }
}
