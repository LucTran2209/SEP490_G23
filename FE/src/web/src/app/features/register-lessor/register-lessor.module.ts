import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/shared/shared.module';
import { SteperRegisterComponent } from './components/steper-register/steper-register.component';
import { RegisterLessorRoutingModule } from './register-lessor-routing.module';
import { StepIdentifyComponent } from './components/steper-register/step-identify/step-identify.component';
import { StepInfoComponent } from './components/steper-register/step-info/step-info.component';
import { StepTaxComponent } from './components/steper-register/step-tax/step-tax.component';
import { StepFinishComponent } from './components/steper-register/step-finish/step-finish.component';
import { featureRegisterLessor } from './state/register_lessor.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RegisterLessorEffects } from './state/register_lessor.effects';

@NgModule({
  declarations: [
    SteperRegisterComponent,
    StepFinishComponent,
    StepIdentifyComponent,
    StepInfoComponent,
    StepTaxComponent,
  ],
  imports: [
    SharedModule,
    RegisterLessorRoutingModule,
    StoreModule.forFeature(featureRegisterLessor),
    EffectsModule.forFeature([RegisterLessorEffects])
  ],
})
export class RegisterLessorModule {}
