import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { OrderDetailComponent } from './components/manage-order/order-detail/order-detail.component';
import { ManagerShopComponent } from './components/manager-shop/manager-shop.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ManageVoucherComponent } from './components/manage-voucher/manage-voucher.component';
import { ManageNotificationComponent } from './components/manage-notification/manage-notification.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: OverviewComponent,
    title: 'Thống Kê | ERMS'
  },
  {
    path: 'shop/:id',
    component: ManagerShopComponent,
    title: 'Quản Lý Cửa Hàng Của Tôi | ERMS'
  },
  {
    path: "order",
    component: ManageOrderComponent,
    title: 'Quản Lý Đơn Hàng | ERMS'
  },
  {
    path: "order/:id",
    component: OrderDetailComponent,
    title: 'Chi Tiết Đơn Hàng | ERMS'
  },
  {
    path: "voucher",
    component: ManageVoucherComponent,
    title: 'Quản Lý Voucher | ERMS'
  },
  {
    path: "notification",
    component: ManageNotificationComponent,
    title: 'Thông Báo | ERMS'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessorRoutingModule { }
  