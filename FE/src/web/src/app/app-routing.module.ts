import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { authGuard } from './guards/auth.guard';
import { USER_ROLE } from './utils/constant';
import { LayoutDashboardComponent } from './components/core/layout-dashboard/layout-dashboard.component';
import { LayoutUserComponent } from './components/core/layout-user/layout-user.component';
import { HomePageComponent } from './features/users/components/home-page/home-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/test' },
  { path: 'test', component: HomePageComponent },
  { path: 'error', component: AnonymousComponent },
  { path: 'home', component: HomePageComponent },
  {
    path: 'admin',
    // canActivate: [authGuard],
    component: LayoutDashboardComponent,
    data: { expectedRole: USER_ROLE.ADMIN },
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    component: LayoutUserComponent,
    loadChildren: () =>
      import('./features/users/user.module').then((m) => m.UserModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
