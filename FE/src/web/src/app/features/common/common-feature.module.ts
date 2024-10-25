import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../components/shared/shared.module';
import { CommonRoutingModule } from './common-routing.module';
import { FilterProductRentalComponent } from './components/filter-post-rental/filter-post-rental.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductRentalDetailComponent } from './components/product-rental-detail/product-rental-detail.component';
import { ProductRentalListComponent } from './components/product-rental-list/product-rental-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListMyOrderComponent } from './components/list-my-order/list-my-order.component';
import { ShopPersonalComponent } from './components/shop-personal/shop-personal.component';
import { LayoutProfileComponent } from '../../components/layout/layout-profile/layout-profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    HomePageComponent,
    ListMyOrderComponent,
    LayoutProfileComponent,
    FilterProductRentalComponent,
    ProductRentalDetailComponent,
    ProductRentalListComponent,
    ShopPersonalComponent
  ],
  imports: [CommonModule, SharedModule, CommonRoutingModule],
})
export class CommonFeatureModule {}
