import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessorRoutingModule } from './lessor-routing.module';
import { SharedModule } from '../../components/shared/shared.module';
import { ManagePostComponent } from './components/manage-post/manage-post.component';
import { ManagerShopComponent } from './components/manager-shop/manager-shop.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { OrderDetailComponent } from './components/manage-order/order-detail/order-detail.component';

@NgModule({
  declarations: [ManagePostComponent, ManagerShopComponent, ManageOrderComponent, OrderDetailComponent],
  imports: [CommonModule, LessorRoutingModule, SharedModule],
})
export class LessorModule {}
