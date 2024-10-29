import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IPayLoad } from '../../../interfaces/account.interface';
import { StorageService } from '../../../services/storage.service';
import { LocalStorageKey, USER_ROLE } from '../../../utils/constant';
import { Store } from '@ngrx/store';
import { logout } from '../../../features/auth/state/auth.actions';
import { FeatureAppState } from '../../../store/app.state';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-user-navbar-header',
  templateUrl: './user-navbar-header.component.html',
  styleUrl: './user-navbar-header.component.scss',
})
export class UserNavbarHeaderComponent implements OnInit {
  user?: IPayLoad;
  @Output() avatarClick = new EventEmitter<void>();
  readonly USERROLE = USER_ROLE;
  userRole: USER_ROLE = USER_ROLE.LESSOR;
  avatarPersonal: string = '';


  constructor(
    private router: Router,
    private storageService: StorageService,
    private store: Store<FeatureAppState>,
    private userProfileService: UserProfileService,
  ) {}
  ngOnInit(): void {
    this.handleAssginInfo();
    this.checkRole();
    this.avatarPersonal = this.userProfileService.avatar;
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
