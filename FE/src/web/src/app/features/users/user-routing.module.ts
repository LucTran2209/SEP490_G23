import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousV2Component } from './components/anonymous-v2/anonymous-v2.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent,
  // },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'product-detail',
    component: PostDetailComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
