import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { SharedModule } from '../../components/shared/shared.module';


@NgModule({
  declarations: [DashboardComponent, ManageUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,

  ]
})
export class AdminModule { }
