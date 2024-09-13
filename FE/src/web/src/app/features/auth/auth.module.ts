import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../components/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginOtherComponent } from './components/login-other/login-other.component';


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, LoginOtherComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
