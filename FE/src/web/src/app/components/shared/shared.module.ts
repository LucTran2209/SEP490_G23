import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
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
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from '../../../environments/environment.development';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { NumberOnlyDirective } from '../../directives/number-only.directive';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingComponent } from '../core/loading/loading.component';
import { SvgIconComponent } from '../core/svg-icon/svg-icon.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SelectItemComponent } from '../core/select-item/select-item.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { NavbarHeadearComponent } from '../core/navbar-headear/navbar-headear.component';
import { UserNavbarHeaderComponent } from '../core/user-navbar-header/user-navbar-header.component';
import { NavMenuComponent } from '../core/nav-menu/nav-menu.component';
import { ProductCardComponent } from '../core/product-card/product-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { FooterComponent } from '../core/footer/footer.component';
import { ChatComponent } from '../core/chat/chat.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { RentalDetailCardComponent } from '../core/rental-detail-card/rental-detail-card.component';
import { ProductCarouseComponent } from '../core/product-carouse/product-carouse.component';
import { CommentComponent } from '../core/comment/comment.component';
import { RatingProccessProductComponent } from '../core/rating-proccess-product/rating-proccess-product.component';

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
  NzDatePickerModule,
  NzSpinModule,
  NzRadioModule,
  NzUploadModule,
  NzSelectModule,
  NzCardModule,
  NzSkeletonModule,
  NzDropDownModule,
  NzTabsModule,
  NzCarouselModule,
  NzCommentModule,
  NzProgressModule,


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
  UploadFileComponent,
  NavbarHeadearComponent,
  UserNavbarHeaderComponent,
  NavMenuComponent,
  ProductCardComponent,
  FooterComponent,
  CommentComponent,
  ChatComponent,
  RentalDetailCardComponent,
  ProductCarouseComponent,
  RatingProccessProductComponent,

]

@NgModule({
  declarations: [...SHARED_MODULES],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ...ANTD_MODULES
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
