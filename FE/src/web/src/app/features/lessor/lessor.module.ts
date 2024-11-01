import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../components/shared/shared.module';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { OrderDetailComponent } from './components/manage-order/order-detail/order-detail.component';
import { ManagePostComponent } from './components/manage-post/manage-post.component';
import { ManagerShopComponent } from './components/manager-shop/manager-shop.component';
import { LessorRoutingModule } from './lessor-routing.module';

@NgModule({
  declarations: [ManagePostComponent, ManagerShopComponent, ManageOrderComponent, OrderDetailComponent],
  imports: [CommonModule, LessorRoutingModule, SharedModule],
})
export class LessorModule {}
