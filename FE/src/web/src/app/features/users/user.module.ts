import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../components/shared/shared.module';
import { AnonymousV2Component } from './components/anonymous-v2/anonymous-v2.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { userFeature } from './state/user.feature';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    AnonymousV2Component,
    ProfileComponent,
    HomePageComponent,
    PostDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature(userFeature),
  ],
})
export class UserModule {}
