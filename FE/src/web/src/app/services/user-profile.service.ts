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

  get currentUser(): IPayLoad | null {
    try {
      const userJson = this.storgageService.get(LocalStorageKey.currentUser);
      return userJson ? JSON.parse(userJson) : null; // Handle empty string or null
    } catch (error) {
      console.error('Error parsing currentUser JSON:', error);
      return null; // Return null if JSON parsing fails
    }
  }
  

  get roleCurrentUser(): string | string[] | undefined {
    return this.currentUser?.Role; 
  }
  
  get UserId(): string | undefined {
    return this.currentUser?.UserId;
  }
  
  // Getter for avatar
  get avatar(): string | undefined {
    return this.currentUser?.Avatar;
  }
  get rentalshopId(): string | undefined {
    return this.currentUser?.RentalShopId;
  }

  get email(): string | undefined {
    return this.currentUser?.Email;
  }
  

  // Method to update avatar URL
  setAvatar(avatarUrl: string): void {
    const user = this.currentUser;
    if (user) {
      user.Avatar = avatarUrl;
      this.currentUser = user; // Trigger setter to save updated user to storage
    }
  }
}
