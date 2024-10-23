import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { confirmValidator } from '../../../../utils/validators';
import { IResetPassword } from '../../../../interfaces/account.interface';
import { resetPassword } from '../../state/auth.actions';
interface objectParam {
  token: string;
  email: string;
}
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  passwordVisible = false;
  confirmPasswordVisible = false;
  objParam$!: Observable<objectParam>;
  validateResetForm: FormGroup<{
    password: FormControl<string>;
    confirm: FormControl<string>;
  }>;

  submitForm(): void {
    
    this.objParam$.subscribe((params) => {
      const data: IResetPassword = {
        email: params.email,
        token: params.token,
        newPassword: this.validateResetForm.controls.password.value
      }
      console.log('Submit Data:', data);
      this.store.dispatch(resetPassword({ data }));
    })
  }

  validateConfirmPassword(): void {
    this.validateResetForm.controls.confirm.updateValueAndValidity();
  }

  getParam(): Observable<objectParam> {
    return this.routeActivate.paramMap.pipe(
      map((params) => ({
        token: params.get('token') || '',
        email: params.get('email') || '',
      })),
      tap((param) => console.log('Params:', param)) 
    );
  }

  ngOnInit(): void {
    this.objParam$ = this.getParam();
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private storageService: StorageService,
    private store: Store<FeatureAppState>,
    private routeActivate: ActivatedRoute
  ) {
    this.validateResetForm = this.fb.group({
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    });
    this.validateResetForm
      .get('confirm')
      ?.setValidators(
        confirmValidator(this.validateResetForm.get('password')!)
      );
  }
}
