import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayLoad } from '../../../interfaces/account.interface';
import { StorageService } from '../../../services/storage.service';
import { LocalStorageKey, USER_ROLE } from '../../../utils/constant';
import { Store } from '@ngrx/store';
import { logout } from '../../../features/auth/state/auth.actions';
import { FeatureAppState } from '../../../store/app.state';
import { UserProfileService } from '../../../services/user-profile.service';
import { MessageResponseService } from '../../../services/message-response.service';

@Component({
  selector: 'app-user-navbar-header',
  templateUrl: './user-navbar-header.component.html',
  styleUrl: './user-navbar-header.component.scss',
})
export class UserNavbarHeaderComponent implements OnInit {
  user?: IPayLoad;
  searchText: string = '';
  @Output() avatarClick = new EventEmitter<void>();
  readonly USERROLE = USER_ROLE;
  userRole: USER_ROLE = USER_ROLE.LESSOR;
  avatarPersonal?: string;
  rentalShopId?: string;
  userName?: string;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private store: Store<FeatureAppState>,
    private userProfileService: UserProfileService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageResponseService
  ) {}
  ngOnInit(): void {
    this.handleAssginInfo();
    this.checkRole();
    this.avatarPersonal = this.userProfileService.avatar;
    this.rentalShopId = this.userProfileService.rentalshopId;
    this.userName = this.userProfileService.currentUser?.UserName;
    this.activatedRoute.queryParams.subscribe((params) => {
      const currentRoute = this.router.url; // Get current route
      if (currentRoute.includes('/common/product-search')) {
        const searchQuery = params['search'];
        if (searchQuery) {
          this.searchText = searchQuery;
        }
      } else {
        this.searchText = '';
      }
    });
  }

  onAvatarClick(): void {
    this.avatarClick.emit();
  }

  onRedirect(path: string) {
    this.router.navigate([`${path}`]);
  }

  handleAssginInfo() {
    const userData = this.storageService.get(LocalStorageKey.currentUser);
    if (userData) {
      this.user = JSON.parse(userData) as IPayLoad;
    }
  }

  logout() {
    this.store.dispatch(logout());
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
  onSearch() {
    this.router.navigate(['/common/product-search'], {
      queryParams: { search: this.searchText },
    });
  }
  onShow() {
    const shopId = this.userProfileService.rentalshopId;
    if (shopId) {
      this.messageService.showInfo('Yêu Cầu Đang Chờ Xét Duyệt Vui Lòng Đợi!');
    } else {
      this.router.navigate(['/portal/register-lessor']);
    }
  }
}
