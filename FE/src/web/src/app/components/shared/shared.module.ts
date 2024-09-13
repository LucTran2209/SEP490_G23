import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ButtonComponent } from '../core/button/button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AnonymousComponent } from '../anonymous/anonymous.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzResultModule } from 'ng-zorro-antd/result'
registerLocaleData(en);

const ANTD_MODULES = [
  NzLayoutModule,
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzCheckboxModule,
  NzAlertModule,
  NzResultModule
]

const SHARED_MODULES = [
  ButtonComponent,
  AnonymousComponent,
]

@NgModule({
  declarations: [...SHARED_MODULES],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,...ANTD_MODULES

  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, ...ANTD_MODULES,...SHARED_MODULES ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ]
  

})
export class SharedModule { }
