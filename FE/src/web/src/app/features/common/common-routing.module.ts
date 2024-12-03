import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListMyOrderComponent } from './components/list-my-order/list-my-order.component';
import { ProductRentalListComponent } from './components/product-rental-list/product-rental-list.component';
import { LayoutProfileComponent } from '../../components/layout/layout-profile/layout-profile.component';
import { ProfileComponent } from './state/profile/profile.component';
import { ProductRentalDetailComponent } from './components/product-rental-detail/product-rental-detail.component';
import { ShopPersonalComponent } from './components/shop-personal/shop-personal.component';
import { MyOrderDetailComponent } from './components/my-order-detail/my-order-detail.component';
import { HowitorderComponent } from './static/howitorder/howitorder.component';
import { ShopRentalListComponent } from './components/shop-rental-list/shop-rental-list.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { MyWalletComponent } from './components/my-wallet/my-wallet.component';
import { MyVoucherComponent } from './components/my-voucher/my-voucher.component';
import { AuthSlug } from '../../configs/api.configs';
import { ChangePasswordComponent } from '../auth/components/change-password/change-password.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Trang Chủ | ERMS'
    // data: { breadcrumb: 'Trang Chủ' }
  },
  {
    path: 'howitorder',
    component: HowitorderComponent,
    title: 'Quy Trình Thuê | ERMS',
    data: { breadcrumb: 'Quy Trình Thuê' }
  },
  {
    path: 'user',
    component: LayoutProfileComponent,
    children: [
      { 
        path: 'account', 
        children: [
          { path: 'profile', component: ProfileComponent, title: 'Hồ Sơ | ERMS'  },
          {
            path: AuthSlug.ChangePassword.label,
            component: ChangePasswordComponent,
            title: AuthSlug.ChangePassword.title,
          },
        ],
      },
     
      { 
        path: 'payment', 
        children: [
          { path: 'my-wallet', component: MyWalletComponent, title: 'Ví Tiền | ERMS'  },
        ],
      },
      { path: 'my-voucher', component: MyVoucherComponent, title: 'Kho Voucher | ERMS'  },
      {
        path: 'order',
        children: [
          { path: '', component: ListMyOrderComponent, title: 'Danh Sách Đơn Hàng Của Tôi | ERMS'  },
          { path: 'order-detail/:id', component: MyOrderDetailComponent, title: 'Chi Tiết Đơn Hàng | ERMS' },
      ]
      },
      {
        path:'notification',
        component: NotificationListComponent,
        title: 'Thông Báo | ERMS'
      }
    ]
  },
  {
    path: 'product-search',
    component: ProductRentalListComponent,
    title: 'Danh Sách Tìm Kiếm Thiết Bị | ERMS'
  },
  {
    path: 'product-list/:slug/caid/:id',
    component: ProductRentalListComponent,
    data: { breadcrumb: 'Danh Sách Sản Phẩm' },
    title: 'Danh Sách Tìm Kiếm Thiết Bị | ERMS'
  },
  {
    path: 'product-detail/:slug/.i/:id/.suid/:suid/:subslug',
    component: ProductRentalDetailComponent,
    data: { breadcrumb: 'Chi Tiết Sản Phẩm' },
    title: 'Danh Sách Tìm Kiếm | ERMS'
  },
  {
    path: 'shop/:id',
    component: ShopPersonalComponent,
    data: { breadcrumb: 'Shop' },
    title: 'Cửa Hàng | ERMS'
  },
  {
    path: 'shopList',
    component: ShopRentalListComponent,
    title: 'Danh Sách Tìm Kiếm Cửa Hàng | ERMS'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}
