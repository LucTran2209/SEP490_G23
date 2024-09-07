import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

const ANTD_MODULES = [
  NzLayoutModule,
  NzMenuModule
]

const SHARED_MODULES = [

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, ...ANTD_MODULES
  ],
  exports: [
    CommonModule, ...ANTD_MODULES ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ]
  

})
export class SharedModule { }
