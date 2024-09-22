import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginOtherComponent } from './components/login-other/login-other.component';
import { AuthSlug } from '../../configs/api.configs';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthLayoutComponent } from '../../components/layout/auth-layout/auth-layout.component';
import { imageResolver } from '../../resolvers/image.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: AuthSlug.Login.title
  },
  {
    path: 'login-other',
    component: LoginOtherComponent,
    title: AuthSlug.LoginOther.title
  },
  {
    path: '',
    component: AuthLayoutComponent,
    resolve: {
      imageResolve: imageResolver
    },
    children: [
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: AuthSlug.ForgotPassWord.title
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: AuthSlug.ResetPassWord.title
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: AuthSlug.Register.title,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
