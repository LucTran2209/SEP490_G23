import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { LayoutDashboardComponent } from './components/layout/layout-dashboard/layout-dashboard.component';
import { LayoutUserComponent } from './components/layout/layout-user/layout-user.component';
import { authGuard } from './guards/auth.guard';
import { USER_ROLE } from './utils/constant';
import { ErrorComponent } from './features/error/error.component';
import { isLoginGuard } from './guards/is-login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/common/home' },
  { path: 'base', component: AnonymousComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    component: LayoutDashboardComponent,
    data: { expectedRole: [USER_ROLE.ADMIN] },
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'common',
    component: LayoutUserComponent,
    loadChildren: () =>
      import('./features/common/common-feature.module').then(
        (m) => m.CommonFeatureModule
      ),
  },
  {
    path: 'auth',
    canActivate: [isLoginGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'portal',
    canActivate: [authGuard],
    data: { expectedRole: [USER_ROLE.RENTER] },
    loadChildren: () =>
      import('./features/register-lessor/register-lessor.module').then(
        (m) => m.RegisterLessorModule
      ),
  },
  {
    path: 'lessor',
    canActivate: [authGuard],
    component: LayoutDashboardComponent,
    data: { expectedRole: [USER_ROLE.LESSOR] },
    loadChildren: () =>
      import('./features/lessor/lessor.module').then((m) => m.LessorModule),
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
