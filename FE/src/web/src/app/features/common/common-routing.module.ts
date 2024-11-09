import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListMyOrderComponent } from './components/list-my-order/list-my-order.component';
import { ProductRentalListComponent } from './components/product-rental-list/product-rental-list.component';
import { LayoutProfileComponent } from '../../components/layout/layout-profile/layout-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductRentalDetailComponent } from './components/product-rental-detail/product-rental-detail.component';
import { ShopPersonalComponent } from './components/shop-personal/shop-personal.component';
import { MyOrderDetailComponent } from './components/my-order-detail/my-order-detail.component';
import { HowitorderComponent } from './static/howitorder/howitorder.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'howitorder',
    component: HowitorderComponent,
  },
  {
    path: 'user',
    component: LayoutProfileComponent,
    children: [
      { 
        path: 'account', 
        children: [
          { path: 'profile', component: ProfileComponent },
        ],
      },
      {
        path: 'order',
        children: [
          { path: '', component: ListMyOrderComponent },
          { path: 'order-detail/:id', component: MyOrderDetailComponent },
          // { path: 'order-detail', component: MyOrderDetailComponent },
      ]
      },
    ]
  },
  {
    path: 'product-list/:slug/caid/:id',
    component: ProductRentalListComponent,
  },
  {
    path: 'product-detail/:slug./.i/:id',
    component: ProductRentalDetailComponent,
  },
  {
    path: 'shop/:id',
    component: ShopPersonalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}
