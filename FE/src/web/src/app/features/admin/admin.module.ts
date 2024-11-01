import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../components/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';


@NgModule({
  declarations: [DashboardComponent, ManageUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    // StoreModule.forFeature(adminFeature),
    // EffectsModule.forRoot([AdminEffect]),

  ]
})
export class AdminModule { }
