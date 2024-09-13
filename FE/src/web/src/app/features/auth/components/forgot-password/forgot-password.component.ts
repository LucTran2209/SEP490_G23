import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{

  forgotPasswordForm = this.formbuilder.group({
    phone: ['', [Validators.required]]
  })


  submitForm(): void {
    if(this.forgotPasswordForm.valid){
      console.log('submit: ', this.forgotPasswordForm.value);
    }else{
      Object.values(this.forgotPasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private formbuilder: FormBuilder) {
  }

  ngOnInit(): void {
      
  }
}
