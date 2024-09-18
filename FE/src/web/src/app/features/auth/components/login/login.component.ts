import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IExternalLoginRequest, ILoginRequest } from '../../../../interfaces/account.interface';
import { Store } from '@ngrx/store';
import { login, login_external } from '../../state/auth.actions';
import { delay, Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { selectStatus } from '../../state/auth.feature';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isProcessLoading$?: Observable<StatusProcess>;

  constructor(
    private fb: NonNullableFormBuilder,
    private externalAuthService: SocialAuthService,
    private store: Store,
    private loadingService: LoadingService
  ) {
    this.isProcessLoading$ = this.loadingService.status$;
  }

  ngOnInit(): void {
    this.processAuthState();
  }


  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(100)]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  /**method: get username
 * paramerter: no parameter
 * puporse: take username from instance validateForm
 */
  get username(): FormControl<string> {
    return this.validateForm.get('username') as FormControl;
  }

  /**method: get passowrd
   * paramerter: no parameter
   * puporse: take password from instance validateForm
   */
  get password(): FormControl<string> {
    return this.validateForm.get('password') as FormControl;
  }


  /**
   * 
   */
  submitForm(): void {
    if (this.validateForm.valid) {
      let data: ILoginRequest = {
        username: this.username.value, password: this.password.value
      }
      this.store.dispatch(login({ data }))
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  /**
   * 
   * @param googleWrapper 
   */

  googleSignin(googleWrapper: any) {
    googleWrapper.click();

  }

  /**
   * @description HTTP requests for login external
   * @description HTTP requests for login external
   * @description HTTP requests for login external
   */
  processAuthState() {
    let googleRequest: IExternalLoginRequest = {
      credential: ''
    }
    this.externalAuthService.authState.subscribe((user) => {
      googleRequest.credential = user.idToken;
      console.log('>>> line 72:', googleRequest);
      this.store.dispatch(login_external({ data: googleRequest }))
    });
  }

}
