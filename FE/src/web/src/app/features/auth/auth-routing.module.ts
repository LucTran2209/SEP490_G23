import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '../../components/layout/auth-layout/auth-layout.component';
import { AuthSlug } from '../../configs/api.configs';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { checkRegisterCommonGuard } from '../../guards/check-register-common.guard';
import { WarningOutRegisterGuard } from '../../guards/warning-out-register.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'login',
  },
  {
    path: AuthSlug.Login.label,
    component: LoginComponent,
    title: AuthSlug.Login.title,
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: AuthSlug.ForgotPassWord.label,
        component: ForgotPasswordComponent,
        title: AuthSlug.ForgotPassWord.title,
      },
      {
        path: AuthSlug.ResetPassWord.label,
        component: ResetPasswordComponent,
        title: AuthSlug.ResetPassWord.title,
      },
      {
        path: AuthSlug.Register.label,
        component: RegisterComponent,
        title: AuthSlug.Register.title,
        canActivate: [checkRegisterCommonGuard],
      },
      {
        path: AuthSlug.VerifyEmail.label,
        component: VerifyEmailComponent,
        title: AuthSlug.VerifyEmail.title,
        canDeactivate: [WarningOutRegisterGuard]
      },
    ],
  },
  {
    path: AuthSlug.ChangePassword.label,
    component: ChangePasswordComponent,
    title: AuthSlug.ChangePassword.title,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
