import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessorRoutingModule } from './lessor-routing.module';
import { SharedModule } from '../../components/shared/shared.module';
import { ManagePostComponent } from './components/manage-post/manage-post.component';


@NgModule({
  declarations: [
    ManagePostComponent
  ],
  imports: [
    CommonModule,
    LessorRoutingModule,
    SharedModule,
  ]
})
export class LessorModule { }
