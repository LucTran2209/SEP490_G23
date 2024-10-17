import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePostComponent } from './components/manage-post/manage-post.component';

const routes: Routes = [
  {
    path: 'post',
    component: ManagePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessorRoutingModule { }
