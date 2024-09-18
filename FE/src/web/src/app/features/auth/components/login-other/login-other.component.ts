import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ILoginRequest } from '../../../../interfaces/account.interface';
import { login } from '../../state/auth.actions';
import { AuthService } from '../../../../services/auth.service';
import { FeatureAppState } from '../../../../store/featureApp.state';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-login-other',
  templateUrl: './login-other.component.html',
  styleUrl: './login-other.component.scss'
})
export class LoginOtherComponent implements OnInit {
  isProcessLoading$?: Observable<StatusProcess>;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<FeatureAppState>,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { 

    this.isProcessLoading$ = this.loadingService.status$;
  }

  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });


  ngOnInit(): void {

  }

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

  submitForm(): void {
    if (this.validateForm.valid) {
      let data: ILoginRequest = {
        username: this.username.value, password: this.password.value
      }
      this.store.dispatch(login({data}))
      this.authService.routerLinkRedirectURLSubject.next('admin');
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
