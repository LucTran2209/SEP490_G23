import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BaseChartDirective } from 'ng2-charts';
import { SharedModule } from '../../components/shared/shared.module';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { OrderDetailComponent } from './components/manage-order/order-detail/order-detail.component';
import { ManagePostComponent } from './components/manage-post/manage-post.component';
import { ManagerShopComponent } from './components/manager-shop/manager-shop.component';
import { CardOverviewComponent } from './components/overview/card-overview/card-overview.component';
import { NotifcationLatestComponent } from './components/overview/notifcation-latest/notifcation-latest.component';
import { OrderLatestComponent } from './components/overview/order-latest/order-latest.component';
import { OverviewComponent } from './components/overview/overview.component';
import { OrderStatisticComponent } from './components/overview/statistics/order-statistic/order-statistic.component';
import { RevenueStatisticComponent } from './components/overview/statistics/revenue-statistic/revenue-statistic.component';
import { SubCategoryStatisticComponent } from './components/overview/statistics/sub-category-statistic/sub-category-statistic.component';
import { ManageVoucherComponent } from './components/manage-voucher/manage-voucher.component';
import { LessorRoutingModule } from './lessor-routing.module';
import { OrderDetailEffects } from './state/order-detail.effects';
import { orderDetailFeature } from './state/order-detail.reducer';
@NgModule({
  declarations: [
    ManagePostComponent,
    ManagerShopComponent,
    ManageOrderComponent,
    OrderDetailComponent,
    OverviewComponent,
    CardOverviewComponent,
    SubCategoryStatisticComponent,
    RevenueStatisticComponent,
    OrderStatisticComponent,
    OrderLatestComponent,
    NotifcationLatestComponent,
    ManageVoucherComponent,
  ],
  imports: [
    LessorRoutingModule,
    CommonModule,
    StoreModule.forFeature(orderDetailFeature),
    EffectsModule.forFeature([OrderDetailEffects]),
    SharedModule,
    BaseChartDirective
  ],
})
export class LessorModule {}
