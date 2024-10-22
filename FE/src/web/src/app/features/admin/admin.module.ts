import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { SharedModule } from '../../components/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { adminFeature } from './state/admin.feature';
import { AdminEffect } from './state/admin.effects';
import { EffectsModule } from '@ngrx/effects';


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
