import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocalStorageKey } from '../utils/constant';
import { IAccount } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private storgageService: StorageService) { }

  set currentUser(user: any | null) {
    if (user) {
      this.storgageService.set(LocalStorageKey.currentUser, JSON.stringify(user));
    } else {
      this.storgageService.unset(LocalStorageKey.currentUser);
    }
  }

  get currentUser(): any {
    try {
      return JSON.parse(this.storgageService.get(LocalStorageKey.currentUser) || '{}');
    } catch (error) {
      return JSON.parse('{}');
    }
  }
}
