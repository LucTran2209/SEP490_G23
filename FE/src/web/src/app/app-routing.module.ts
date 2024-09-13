import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { LoginOtherComponent } from './features/auth/components/login-other/login-other.component';
import { authGuard } from './guards/auth.guard';
import { USER_ROLE } from './utils/constant';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/test' },
  { path: 'test', component: LoginOtherComponent },
  { path: 'error', component: AnonymousComponent },
  {
    path: 'admin', 
    canActivate: [authGuard],
    data: {expectedRole: USER_ROLE.ADMIN},
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'user', loadChildren: () => import('./features/users/user.module').then(m => m.UserModule)},
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
