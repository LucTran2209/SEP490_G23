import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginOtherComponent } from './components/login-other/login-other.component';
import { AuthSlug } from '../../configs/api.configs';

const routes: Routes = [
  {
    path: '',
    pathMatch:'prefix',
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
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: AuthSlug.ForgotPassWord.title
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
