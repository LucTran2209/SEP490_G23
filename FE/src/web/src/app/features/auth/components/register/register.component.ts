import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRegisterRequest } from '../../../../interfaces/account.interface';
import { StorageService } from '../../../../services/storage.service';
import { FormatDate } from '../../../../utils/constant';
import * as AuthActions from '../../state/auth.actions';
import { FeatureAppState } from '../../../../store/app.state';
type Flag_ProcessType = 'OK_TAB1' | 'OK_TAB2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  flag_process: Flag_ProcessType = 'OK_TAB1';
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
  });
  forminfoauthgroup: FormGroup = this.fb.group({
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

  ngOnInit(): void {}

  handleselectAddress(address: string) {
    this.forminfocommongroup.patchValue({ address });
  }

  toggleTabRegiser(tabHandle: Flag_ProcessType) {
    this.flag_process = tabHandle;
  }

  submitTab1(): void {
    if (this.forminfocommongroup.valid) {
      this.toggleTabRegiser('OK_TAB2');
    } else {
      this.markControlsAsDirty(this.forminfocommongroup);
    }
  }

  submitTabFinall(): void {
    if (this.forminfoauthgroup.valid) {
      let requestRegister: IRegisterRequest = {
        ...this.forminfocommongroup.value,
        ...this.forminfoauthgroup.value,
      };
      this.store.dispatch(AuthActions.register({ data: requestRegister }));
      console.log(requestRegister);
    } else {
      this.markControlsAsDirty(this.forminfoauthgroup);
    }
  }
}
