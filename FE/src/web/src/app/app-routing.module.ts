import { NgModule } from '@angular/core';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { LayoutDashboardComponent } from './components/core/layout-dashboard/layout-dashboard.component';
import { LayoutUserComponent } from './components/core/layout-user/layout-user.component';
import { HomePageComponent } from './features/users/components/home-page/home-page.component';
import { USER_ROLE } from './utils/constant';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  // { path: 'test', component: AnonymousComponent },
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
  {
    path: 'portal',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/register-lessor/register-lessor.module').then(
        (m) => m.RegisterLessorModule
      ),
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
  {
    path: 'lessor',
    canActivate: [authGuard],
    component: LayoutDashboardComponent,
    data: { expectedRole: USER_ROLE.LESSOR },
    loadChildren: () =>
      import('./features/lessor/lessor.module').then((m) => m.LessorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
