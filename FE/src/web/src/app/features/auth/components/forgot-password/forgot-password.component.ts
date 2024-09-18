import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable, range, takeWhile, timeout, timer } from 'rxjs';
import { countDownTimer } from '../../../../utils/anonymous.helper';
import { ItimeClock } from '../../../../interfaces/anonymous.interface';
import { IForgotPassword } from '../../../../interfaces/account.interface';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ForgotPasswordComponent implements OnInit, AfterViewInit, AfterViewChecked {
  timeClock$?: Observable<ItimeClock>;

  forgotPasswordForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]]
  })

  enterCodeForm = this.formbuilder.group({
    number1: ['', [Validators.required]],
    number2: ['', [Validators.required]],
    number3: ['', [Validators.required]],
    number4: ['', [Validators.required]],
  })

  get otpCode(){
    return Object.values(this.enterCodeForm.controls).map(n => n.value).join('');
  }

  submitForm(): void {
    if (this.forgotPasswordForm.valid) {
    } else {
      Object.values(this.forgotPasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitCodeForm(): void {
    if (this.enterCodeForm.valid) {
      
      
    } else {
      Object.values(this.enterCodeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }


  reverseTimeHandle(seconds: number = 30){
    const startDate = new Date();
    const endDate = new Date();
    endDate.setSeconds(startDate.getSeconds() + seconds);
    this.timeClock$ = countDownTimer(startDate, endDate);
  }

  constructor(private formbuilder: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.reverseTimeHandle(5);

  }
  




  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
     
  }


}
