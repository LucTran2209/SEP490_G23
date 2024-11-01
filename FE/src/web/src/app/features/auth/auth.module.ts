import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../components/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
