import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { IPayLoad } from '../../../../interfaces/account.interface';
import { UserProfileService } from '../../../../services/user-profile.service';
import { FeatureAppState } from '../../../../store/app.state';
import { renterShop } from '../../state/register_lessor.actions';
import {
  selectAddress,
  selectBusinessLicense,
  selectDescription,
  selectEmail,
  selectImageFileBack,
  selectImageFileFront,
  selectIsActive,
  selectPhoneNumber,
  selectRentalScale,
  selectShopName,
  selectTaxNumber,
} from '../../state/register_lessor.reducer';

@Component({
  selector: 'app-steper-register',
  templateUrl: './steper-register.component.html',
  styleUrl: './steper-register.component.scss',
})
export class SteperRegisterComponent {
  current = 0;
  userCurrent: IPayLoad | null;
  shopName$: Observable<string>;
  imageFront$: Observable<File | null>;
  imageBack$: Observable<File | null>;
  taxNumber$: Observable<string>;
  businessLicense$: Observable<File | null>;
  rentalScale$: Observable<string | number>;
  address$: Observable<string>;
  phoneNumber$: Observable<string>;
  email$: Observable<string>;
  isActive$: Observable<boolean>;
  description$: Observable<string>;

  pre(): void {
    if (this.current > 0) {
      this.current--;
    }
  }
  next(): void {
    if (this.current < 2) {
      this.current += 1;
    }
  }
 done(): void {
  combineLatest([
    this.shopName$,
    this.imageFront$,
    this.imageBack$,
    this.taxNumber$,
    this.businessLicense$,
    this.rentalScale$,
    this.address$,
    this.phoneNumber$,
    this.email$,
    this.isActive$,
    this.description$
  ]).subscribe(
    ([
      shopName,
      imageFront,
      imageBack,
      taxNumber,
      businessLicense,
      rentalScale,
      address,
      phoneNumber,
      email,
      isActive,
      description
    ]) => {
      if (!imageFront || !imageBack) {
        console.error('One or more files are missing.');
        return;
      }

      if(!this.userCurrent){
        console.error('Not define user current');
        return;
      }

      const addressTest = `${address}`
      const formData = new FormData();
      formData.append('userId', this.userCurrent.UserId); 
      formData.append('shopName', shopName);
      formData.append('imageFont', imageFront, imageFront.name);
      formData.append('imageBack', imageBack, imageBack.name);
      formData.append('taxNumber', taxNumber);
      formData.append('phoneNumber', phoneNumber);
      formData.append('email', email);
      formData.append('description', description);
      formData.append('rentalScale', rentalScale.toString());
      formData.append('address', addressTest);
      formData.append('isActive', isActive.toString());
      if(businessLicense){
        formData.append('businessLicenseFile', businessLicense, businessLicense.name);
      }else {
        formData.append('businessLicenseFile', String(businessLicense));

      }

      console.log('FormData:', typeof formData);

      this.store.dispatch(renterShop({ formData }));
    }
  );
}


  constructor(
    private store: Store<FeatureAppState>,
    private userprofileService: UserProfileService
  ) {
    this.userCurrent = this.userprofileService.currentUser;
    this.shopName$ = this.store.select(selectShopName);
    this.imageFront$ = this.store.select(selectImageFileFront);
    this.imageBack$ = this.store.select(selectImageFileBack);
    this, (this.taxNumber$ = this.store.select(selectTaxNumber));
    this.businessLicense$ = this.store.select(selectBusinessLicense);
    this.rentalScale$ = this.store.select(selectRentalScale);
    this.address$ = this.store.select(selectAddress);
    this.phoneNumber$ = this.store.select(selectPhoneNumber);
    this.email$ = this.store.select(selectEmail);
    this.isActive$ = this.store.select(selectIsActive);
    this.description$ = this.store.select(selectDescription);
  }
}
