import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManageRegisterLessorComponent } from './components/manage-register-lessor/manage-register-lessor.component';
import { ManageShopsComponent } from './components/manage-shops/manage-shops.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Thống Kê | ERMS'
  },
  {
    path: 'manage-users',
    component: ManageUserComponent,
    title: 'Quản Lý Người Dùng | ERMS'
  },
  {
    path: 'manage-register-lessor',
    component: ManageRegisterLessorComponent,
    title: 'Quản Lý Đơn Đăng Ký | ERMS'
  },
  {
    path: 'manage-shops',
    component: ManageShopsComponent,
    title: 'Quản Lý Cửa Hàng | ERMS'
  },
  {
    path: 'manage-category',
    component: ManageCategoryComponent,
    title: 'Quản Lý Loại Thiết Bị | ERMS'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
