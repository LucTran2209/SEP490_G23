import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { OrderDetailComponent } from './components/manage-order/order-detail/order-detail.component';
import { ManagerShopComponent } from './components/manager-shop/manager-shop.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ManageVoucherComponent } from './components/manage-voucher/manage-voucher.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: OverviewComponent
  },
  {
    path: 'shop/:id',
    component: ManagerShopComponent,
  },
  {
    path: "order",
    component: ManageOrderComponent
  },
  {
    path: "order/:id",
    component: OrderDetailComponent
  },
  {
    path: "voucher",
    component: ManageVoucherComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessorRoutingModule { }
  