import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IPayLoad } from '../../../interfaces/account.interface';
import { StorageService } from '../../../services/storage.service';
import { LocalStorageKey } from '../../../utils/constant';
import { Store } from '@ngrx/store';
import { logout } from '../../../features/auth/state/auth.actions';
import { FeatureAppState } from '../../../store/app.state';

@Component({
  selector: 'app-user-navbar-header',
  templateUrl: './user-navbar-header.component.html',
  styleUrl: './user-navbar-header.component.scss',
})
export class UserNavbarHeaderComponent implements OnInit {
  user?: IPayLoad;
  @Output() avatarClick = new EventEmitter<void>();

  constructor(
    private router: Router,
    private storageService: StorageService,
    private store: Store<FeatureAppState>,
  ) {}
  ngOnInit(): void {
    this.handleAssginInfo();
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
  

}
