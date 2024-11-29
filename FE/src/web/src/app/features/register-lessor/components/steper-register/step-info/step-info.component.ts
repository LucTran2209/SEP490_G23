import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { IRequestRegisterLessor_Step1 } from '../../../../../interfaces/register-lessor.interface';
import { FeatureAppState } from '../../../../../store/app.state';
import { stepInfo } from '../../../state/register_lessor.actions';
import {
  selectEmail,
  selectPhoneNumber,
  selectShopName,
} from '../../../state/register_lessor.reducer';
import { UserProfileService } from '../../../../../services/user-profile.service';
import { REGEX } from '../../../../../utils/constant';

@Component({
  selector: 'app-step-info',
  templateUrl: './step-info.component.html',
  styleUrl: './step-info.component.scss',
})
export class StepInfoComponent implements OnInit, OnDestroy {
  formInfoRegisterLessor: FormGroup<{
    shopName: FormControl<string>;
    email: FormControl<string>;
    phoneNumber: FormControl<string>;
  }>;
  subscription?: Subscription;
  @Output() nextStep = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<FeatureAppState>,
    private userProfileService: UserProfileService
  ) {
    this.formInfoRegisterLessor = this.formBuilder.group({
      shopName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(REGEX.phoneNumber)],
      ],
    }) as FormGroup<{
      shopName: FormControl<string>;
      email: FormControl<string>;
      phoneNumber: FormControl<string>;
    }>;
  }

  ngOnInit(): void {
    let emailCurrentUser = this.userProfileService.email;
    this.subscription = combineLatest([
      this.store.select(selectShopName),
      this.store.select(selectEmail),
      this.store.select(selectPhoneNumber),
    ]).subscribe(([val1, val2, val3]) => {
      this.formInfoRegisterLessor.patchValue({
        email: val2 || emailCurrentUser,
        phoneNumber: val3,
        shopName: val1,
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    if (!this.formInfoRegisterLessor.valid) {
      Object.values(this.formInfoRegisterLessor.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    } else {
      const { email, phoneNumber, shopName } =
        this.formInfoRegisterLessor.value;
      this.store.dispatch(
        stepInfo({
          content: {
            email,
            phoneNumber,
            shopName,
          } as IRequestRegisterLessor_Step1,
        })
      );
      this.nextStep.emit();
    }
  }
}
