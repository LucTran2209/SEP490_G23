import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../components/shared/shared.module';
import { CommonRoutingModule } from './common-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostRetailListComponent } from './components/post-retail-list/post-retail-list.component';
import { FilterPostRentalComponent } from './components/filter-post-rental/filter-post-rental.component';
import { ShopComponent } from './components/shop/shop.component';
import { ListMyOrderComponent } from './components/list-my-order/list-my-order.component';

@NgModule({
  declarations: [
    ProfileComponent,
    HomePageComponent,
    PostDetailComponent,
    PostRetailListComponent,
    FilterPostRentalComponent,
    ShopComponent,
    ListMyOrderComponent,
  ],
  imports: [CommonModule, SharedModule, CommonRoutingModule],
})
export class CommonFeatureModule {}
