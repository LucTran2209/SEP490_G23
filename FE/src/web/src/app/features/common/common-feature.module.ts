import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../components/shared/shared.module';
import { feature_key } from '../../configs/feature_key.config';
import { CommonRoutingModule } from './common-routing.module';
import { FilterProductRentalComponent } from './components/filter-post-rental/filter-post-rental.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListMyOrderComponent } from './components/list-my-order/list-my-order.component';
import { ProductRentalDetailComponent } from './components/product-rental-detail/product-rental-detail.component';
import { ProductRentalListComponent } from './components/product-rental-list/product-rental-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShopPersonalComponent } from './components/shop-personal/shop-personal.component';
import { LayoutProfileComponent } from '../../components/layout/layout-profile/layout-profile.component';
import { MyOrderDetailComponent } from './components/my-order-detail/my-order-detail.component';
import { HowitorderComponent } from './static/howitorder/howitorder.component';
import { ProductDetailEffects } from './state/product/product-detail.effects';
import { featureProductDetail } from './state/product/product-detail.reducer';
import { rentalOrderReducer } from './state/rental/rental.reducers';
import { ShopRentalShopEffects } from './state/shop/shop-personal.effects';
import { featureRentalShopProduct } from './state/shop/shop-personal.reducer';
import { filterFeatures } from '../../store/filters/filter.reducers';
import { featureOrderRentalProduct } from './state/order/order.reducer';
import { OrderProductsEffects } from './state/order/order.effects';
import { ShopRentalListComponent } from './components/shop-rental-list/shop-rental-list.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { MyWalletComponent } from './components/my-wallet/my-wallet.component';

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
    ShopPersonalComponent,
    MyOrderDetailComponent,
    HowitorderComponent,
    ShopRentalListComponent,
    NotificationListComponent,
    MyWalletComponent,
  ],
  imports: [
    CommonModule, SharedModule,
    StoreModule.forFeature(featureRentalShopProduct),
    StoreModule.forFeature(featureOrderRentalProduct),
    StoreModule.forFeature(featureProductDetail),
    StoreModule.forFeature(filterFeatures),
    StoreModule.forFeature(feature_key['rentalProductFeature'], rentalOrderReducer),
    EffectsModule.forFeature([ShopRentalShopEffects]),
    EffectsModule.forFeature([ProductDetailEffects]),
    EffectsModule.forFeature([OrderProductsEffects]),
    CommonRoutingModule
  ],
})
export class CommonFeatureModule {}
