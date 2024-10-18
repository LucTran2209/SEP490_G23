import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostRetailListComponent } from './components/post-retail-list/post-retail-list.component';
import { LayoutProfileComponent } from '../../components/core/layout-profile/layout-profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'account',
    component: LayoutProfileComponent,
    children: [
      {path: 'proflie',
      component: ProfileComponent}
    ]
  },
  {
    path: 'post-detail',
    component: PostDetailComponent,
  },
  {
    path: 'post-list',
    component: PostRetailListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}
