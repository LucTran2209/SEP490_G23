import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IConfirmEmailRequest, IRegisterRequest } from '../../../../interfaces/account.interface';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { FormatDate } from '../../../../utils/constant';
import * as AuthActions from '../../state/auth.actions';
import { map, Observable } from 'rxjs';
import { HttpStatusCode } from '../../../../configs/status-code.config';
import { selectStatusCode } from '../../state/auth.feature';
import { MyValidators } from '../../../../utils/validators';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  selectAddress = [];
  dateFormat = FormatDate.DDMMYYYY;
  isEmailVerifySuccess$?: Observable<boolean>;
  isPasswordVisible = false;
  forminfocommongroup: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    username: [null, [Validators.required, Validators.maxLength(100)]],
    password: [null, [Validators.required]],
    email: [
      null,
      [Validators.required, Validators.email],
      [MyValidators.emailAsync(this.authService)], 
    ],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef,
    private store: Store<FeatureAppState>,
    private authService: AuthService
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
   this.isEmailVerifySuccess$ = this.store.select(selectStatusCode).pipe(
    map(resCode => resCode === HttpStatusCode.OK)
   )
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.reset_state());
  }

  handleselectAddress(address: string) {
    this.forminfocommongroup.patchValue({ address });
  }

  submitTabFinall(): void {
    if (this.forminfocommongroup.valid) {
      let requestRegister: IRegisterRequest = {
        ...this.forminfocommongroup.value,
      };
      this.store.dispatch(AuthActions.verifyEmail({email: this.forminfocommongroup.get("email")?.value}));
      console.log(requestRegister);
    } else {
      this.markControlsAsDirty(this.forminfocommongroup);
    }
  }

  sendOtpCode(){
    this.store.dispatch(AuthActions.verifyEmail({email: this.forminfocommongroup.get("email")?.value}));
  }
  changeEmail(){
    this.forminfocommongroup.patchValue({email: ''})
  }
  verifyOtpCode(otpCode: string){
    let dataRegister: IRegisterRequest = {
      ...this.forminfocommongroup.value
    }
    let data: IConfirmEmailRequest = {
      userComfirmCode: otpCode,
      email: this.forminfocommongroup.get('email')?.value
    }
    this.store.dispatch(AuthActions.confirmVerifyEmail({data, dataRegister}));

  }
}
