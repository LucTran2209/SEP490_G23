import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../components/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageRegisterLessorComponent } from './components/manage-register-lessor/manage-register-lessor.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManageShopsComponent } from './components/manage-shops/manage-shops.component';


@NgModule({
  declarations: [DashboardComponent, ManageUserComponent, ManageRegisterLessorComponent, ManageShopsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    // StoreModule.forFeature(adminFeature),
    // EffectsModule.forRoot([AdminEffect]),

  ]
})
export class AdminModule { }
