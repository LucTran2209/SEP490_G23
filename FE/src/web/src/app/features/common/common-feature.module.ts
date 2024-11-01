import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LayoutProfileComponent } from '../../components/layout/layout-profile/layout-profile.component';
import { SharedModule } from '../../components/shared/shared.module';
import { feature_key } from '../../configs/feature_key.config';
import { CommonRoutingModule } from './common-routing.module';
import { FilterProductRentalComponent } from './components/filter-post-rental/filter-post-rental.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListMyOrderComponent } from './components/list-my-order/list-my-order.component';
import { MyOrderDetailComponent } from './components/my-order-detail/my-order-detail.component';
import { OrderInfoPersonalComponent } from './components/order/order-process/order-info-personal/order-info-personal.component';
import { OrderProcessComponent } from './components/order/order-process/order-process.component';
import { PersonalInfoComponent } from './components/order/order-process/personal-info/personal-info.component';
import { ProductRentalDetailComponent } from './components/product-rental-detail/product-rental-detail.component';
import { ProductRentalListComponent } from './components/product-rental-list/product-rental-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShopPersonalComponent } from './components/shop-personal/shop-personal.component';
import { ProductDetailEffects } from './state/product/product-detail.effects';
import { featureProductDetail } from './state/product/product-detail.reducer';
import { rentalOrderReducer } from './state/rental/rental.reducers';
import { ShopRentalShopEffects } from './state/shop/shop-personal.effects';
import { featureRentalShopProduct } from './state/shop/shop-personal.reducer';

@NgModule({
  declarations: [
    ProfileComponent,
    HomePageComponent,
    ListMyOrderComponent,
    LayoutProfileComponent,
    FilterProductRentalComponent,
    ProductRentalDetailComponent,
    ProductRentalListComponent,
    ProductRentalListComponent,
    OrderProcessComponent,
    PersonalInfoComponent,
    OrderInfoPersonalComponent,
    ShopPersonalComponent,
    MyOrderDetailComponent,
  ],
  imports: [
    CommonModule, SharedModule,
    StoreModule.forFeature(featureRentalShopProduct),
    StoreModule.forFeature(featureProductDetail),
    StoreModule.forFeature(feature_key['rentalProductFeature'], rentalOrderReducer),
    EffectsModule.forFeature([ShopRentalShopEffects]),
    EffectsModule.forFeature([ProductDetailEffects]),
    CommonRoutingModule
  ],
})
export class CommonFeatureModule {}
