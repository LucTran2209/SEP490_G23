import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../utils/constant';
import { StorageService } from './storage.service';
import { IPayLoad } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private storgageService: StorageService) {}

  set currentUser(user: IPayLoad | null) {
    if (user) {
      this.storgageService.set(
        LocalStorageKey.currentUser,
        JSON.stringify(user)
      );
    } else {
      this.storgageService.unset(LocalStorageKey.currentUser);
    }
  }

  get currentUser(): IPayLoad {
    try {
      return JSON.parse(
        this.storgageService.get(LocalStorageKey.currentUser) || '{}'
      );
    } catch (error) {
      return JSON.parse('{}');
    }
  }

  get roleCurrentUser(): number[] | undefined {
    return this.currentUser.roleId;
  }
}
