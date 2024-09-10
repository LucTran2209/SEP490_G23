import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { ForgotPasswordComponent } from './components/pages/auth/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/test' },
  {path: 'test', component: ForgotPasswordComponent },
  { path: 'admin', loadChildren: () => import('./components/pages/admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
