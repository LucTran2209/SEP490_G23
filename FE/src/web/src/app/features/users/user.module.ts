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
import { HomePageComponent } from './components/home-page/home-page.component';
// import { PostDetailComponent } from './components/post-detail/post-detail.component';

@NgModule({
  declarations: [
    AnonymousV2Component,
    ProfileComponent,
    HomePageComponent,
    // PostDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature(userFeature),
  ]
})
export class UserModule { }
