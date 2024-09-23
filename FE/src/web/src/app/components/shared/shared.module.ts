import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ButtonComponent } from '../core/button/button.component';
import { BreadcrumbComponent } from '../core/breadcrumb/breadcrumb.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AnonymousComponent } from '../anonymous/anonymous.component';
import { FormUserComponent } from '../core/form/form-user/form-user.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzResultModule } from 'ng-zorro-antd/result'
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from '../../../environments/environment.development';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NumberOnlyDirective } from '../../directives/number-only.directive';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingComponent } from '../core/loading/loading.component';
import { SvgIconComponent } from '../core/svg-icon/svg-icon.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SelectItemComponent } from '../core/select-item/select-item.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
registerLocaleData(en);

const ANTD_MODULES = [
  NzLayoutModule,
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzCheckboxModule,
  NzAlertModule,
  NzResultModule,
  NzIconModule,
  NzMenuModule,
  NzBadgeModule,
  NzAvatarModule,
  NzTableModule,
  NzPopoverModule,
  NzModalModule,
  NzSelectModule,
  NzRadioModule,
  NzDatePickerModule,
  NzSpinModule,
  NzRadioModule,
  NzDatePickerModule,
  NzUploadModule,
  NzSelectModule
]

const SHARED_MODULES = [
  AnonymousComponent,
  BreadcrumbComponent,
  FormUserComponent,
  GoogleSigninComponent,
  NumberOnlyDirective,
  LoadingComponent,
  SvgIconComponent,
  SelectItemComponent,
  UploadFileComponent
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
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleID
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
  

})
export class SharedModule { }
