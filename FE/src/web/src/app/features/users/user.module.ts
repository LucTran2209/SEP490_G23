import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AnonymousV2Component } from './components/anonymous-v2/anonymous-v2.component';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './state/user.feature';
import { UserEffects } from './state/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../../components/shared/shared.module';

@NgModule({
  declarations: [
    AnonymousV2Component,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature(userFeature),
  ]
})
export class UserModule { }
