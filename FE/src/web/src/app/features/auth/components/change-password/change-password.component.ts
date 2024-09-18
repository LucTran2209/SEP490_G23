import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { matchValidator } from '../../../../utils/form-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  curPswVisible = false;
  newPswVisible = false;
  confirmVisible = false;
  password?: string;
  constructor(private fb: NonNullableFormBuilder) {}

  changePswForm: FormGroup<{
    currentPsw: FormControl<string>;
    newPsw: FormControl<string>;
    confirmPsw: FormControl<string>;
  }> = this.fb.group({
    currentPsw: ['', [Validators.required]],
    newPsw: ['', [Validators.required]],
    confirmPsw: ['', [Validators.required, matchValidator('newPsw')]],
  });
  
  get confirmPsw() {
    return this.changePswForm.get('confirmPsw');
  }

  submitForm(): void {
    if (this.changePswForm.valid) {
      console.log('submit', this.changePswForm.value);
    } else {
      Object.values(this.changePswForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
      
  }
}
