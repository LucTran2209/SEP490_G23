import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SteperRegisterComponent } from './components/steper-register/steper-register.component';
import { StepRegisterLessor } from '../../configs/api.configs';

const routes: Routes = [
  {
    path: 'register-lessor',
    component: SteperRegisterComponent,
    title: StepRegisterLessor.Step_register.title,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterLessorRoutingModule {}
