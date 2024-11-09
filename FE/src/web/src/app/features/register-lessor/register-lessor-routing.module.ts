import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SteperRegisterComponent } from './components/steper-register/steper-register.component';
import { StepRegisterLessor } from '../../configs/api.configs';
import { LayoutUserComponent } from '../../components/layout/layout-user/layout-user.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutUserComponent,
    title: StepRegisterLessor.Step_register.title,
    children: [
      {
        path: 'register-lessor',
        component: SteperRegisterComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterLessorRoutingModule {}
