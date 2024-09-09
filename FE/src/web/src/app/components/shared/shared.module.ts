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
registerLocaleData(en);

const ANTD_MODULES = [
  NzLayoutModule,
  NzMenuModule,
  NzButtonModule
]

const SHARED_MODULES = [
  ButtonComponent,
  AnonymousComponent
]

@NgModule({
  declarations: [...SHARED_MODULES],
  imports: [
    CommonModule, ...ANTD_MODULES

  ],
  exports: [
    CommonModule, ...ANTD_MODULES,...SHARED_MODULES ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ]
  

})
export class SharedModule { }
