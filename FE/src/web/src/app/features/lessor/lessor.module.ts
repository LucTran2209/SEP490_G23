import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessorRoutingModule } from './lessor-routing.module';
import { SharedModule } from '../../components/shared/shared.module';
import { ManagePostComponent } from './components/manage-post/manage-post.component';
import { ManagerShopComponent } from './components/manager-shop/manager-shop.component';

@NgModule({
  declarations: [ManagePostComponent, ManagerShopComponent],
  imports: [CommonModule, LessorRoutingModule, SharedModule],
})
export class LessorModule {}
