import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePostComponent } from './components/manage-post/manage-post.component';
import { ManagerShopComponent } from './components/manager-shop/manager-shop.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { OrderDetailComponent } from './components/manage-order/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: 'post',
    component: ManagePostComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessorRoutingModule { }
  