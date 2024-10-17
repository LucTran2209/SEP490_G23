import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePostComponent } from './components/manage-post/manage-post.component';
import { ManagerShopComponent } from './components/manager-shop/manager-shop.component';

const routes: Routes = [
  {
    path: 'post',
    component: ManagePostComponent,
  },
  {
    path: 'shop',
    component: ManagerShopComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessorRoutingModule { }
