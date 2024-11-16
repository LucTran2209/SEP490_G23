import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRegisterRequest } from '../../../../interfaces/account.interface';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { FormatDate, STRING } from '../../../../utils/constant';
import * as AuthActions from '../../state/auth.actions';
import { getCookie } from '../../../../utils/cookie.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  selectAddress = [];
  dateFormat = FormatDate.DDMMYYYY;

  forminfocommongroup: FormGroup = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.min(1), Validators.maxLength(100)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.min(1), Validators.maxLength(100)],
    ],
    username: [null, [Validators.required, Validators.maxLength(100)]],
    password: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef,
    private store: Store<FeatureAppState>
  ) {}

  private markControlsAsDirty(formCurent: FormGroup): void {
    Object.values(formCurent.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  ngOnInit(): void {
    this.setEmailAfterVerifyEmail();
  }

  handleselectAddress(address: string) {
    this.forminfocommongroup.patchValue({ address });
  }

  submitTabFinall(): void {
    if (this.forminfocommongroup.valid) {
      let requestRegister: IRegisterRequest = {
        ...this.forminfocommongroup.value,
      };
      this.store.dispatch(AuthActions.register({ data: requestRegister }));
      console.log(requestRegister);
    } else {
      this.markControlsAsDirty(this.forminfocommongroup);
    }
  }

  setEmailAfterVerifyEmail(){
     //set email after verify email successfull
     const verifyEmail = getCookie(STRING.EMAIL);
     this.forminfocommongroup.patchValue({email: verifyEmail});
     this.forminfocommongroup.get('email')?.disable();
  }
}
