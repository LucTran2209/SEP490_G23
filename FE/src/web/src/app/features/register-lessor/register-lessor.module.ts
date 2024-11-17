import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../components/shared/shared.module';
import { StepFinishComponent } from './components/steper-register/step-finish/step-finish.component';
import { StepIdentifyComponent } from './components/steper-register/step-identify/step-identify.component';
import { StepInfoComponent } from './components/steper-register/step-info/step-info.component';
import { StepTaxComponent } from './components/steper-register/step-tax/step-tax.component';
import { SteperRegisterComponent } from './components/steper-register/steper-register.component';
import { RegisterLessorRoutingModule } from './register-lessor-routing.module';
import { RegisterLessorEffects } from './state/register_lessor.effects';
import { featureRegisterLessor } from './state/register_lessor.reducer';

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
