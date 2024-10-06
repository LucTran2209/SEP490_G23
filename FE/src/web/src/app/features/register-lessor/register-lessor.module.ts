import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/shared/shared.module';
import { SteperRegisterComponent } from './components/steper-register/steper-register.component';
import { RegisterLessorRoutingModule } from './register-lessor-routing.module';
import { StepIdentifyComponent } from './components/steper-register/step-identify/step-identify.component';
import { StepInfoComponent } from './components/steper-register/step-info/step-info.component';
import { StepTaxComponent } from './components/steper-register/step-tax/step-tax.component';
import { StepFinishComponent } from './components/steper-register/step-finish/step-finish.component';

@NgModule({
  declarations: [
    SteperRegisterComponent,
    StepFinishComponent,
    StepIdentifyComponent,
    StepInfoComponent,
    StepTaxComponent,
  ],
  imports: [SharedModule, RegisterLessorRoutingModule],
})
export class RegisterLessorModule {}
