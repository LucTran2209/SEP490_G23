import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AnonymousV2Component } from './components/anonymous-v2/anonymous-v2.component';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './state/user.feature';
import { UserEffects } from './state/user.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AnonymousV2Component,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(userFeature),
  ]
})
export class UserModule { }
