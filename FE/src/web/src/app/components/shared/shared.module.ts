import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { environment } from '../../../environments/environment.development';
import { NumberOnlyDirective } from '../../directives/number-only.directive';
import { AnonymousComponent } from '../anonymous/anonymous.component';
import { BreadcrumbComponent } from '../core/breadcrumb/breadcrumb.component';
import { ChatComponent } from '../core/chat/chat.component';
import { CommentComponent } from '../core/comment/comment.component';
import { FooterComponent } from '../core/footer/footer.component';
import { FormUserComponent } from '../core/form/form-user/form-user.component';
import { LoadingComponent } from '../core/loading/loading.component';
import { NavMenuComponent } from '../core/nav-menu/nav-menu.component';
import { NavbarHeadearComponent } from '../core/navbar-headear/navbar-headear.component';
import { ProductCardComponent } from '../core/card/product-card/product-card.component';
import { ProductCarouseComponent } from '../core/product-carouse/product-carouse.component';
import { RatingProccessProductComponent } from '../core/rating-proccess-product/rating-proccess-product.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { SvgIconComponent } from '../core/svg-icon/svg-icon.component';
import { SelectItemComponent } from '../core/select-item/select-item.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { UserNavbarHeaderComponent } from '../core/user-navbar-header/user-navbar-header.component';
import { RentalDetailCardComponent } from '../core/rental-detail-card/rental-detail-card.component';
import { ViewMoreItemComponent } from '../core/view-more-item/view-more-item.component';
import { ErrorComponent } from '../../features/error/error.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { RouterModule } from '@angular/router';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { FormPostComponent } from '../core/form/form-post/form-post.component';
import { FormRentalRegistrationComponent } from '../core/form/form-rental-registration/form-rental-registration.component';
import { LayoutProfileComponent } from '../core/layout-profile/layout-profile.component';
import { PostCardComponent } from '../core/card/post-card/post-card.component';
import { FormProductComponent } from '../core/form/form-product/form-product.component';

registerLocaleData(en);

const ANTD_MODULES = [
  NzBreadCrumbModule,
  NzSliderModule,
  NzListModule,
  NzRateModule,
  NzPaginationModule,
  NzStepsModule,
  NzToolTipModule,
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
];

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
  ViewMoreItemComponent,
  RatingProccessProductComponent,
  ErrorComponent,
  ViewMoreItemComponent,
  RatingProccessProductComponent,
  FormPostComponent,
  FormRentalRegistrationComponent,
  LayoutProfileComponent,
  PostCardComponent,
  FormProductComponent,
  
];

@NgModule({
  declarations: [...SHARED_MODULES],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...ANTD_MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...ANTD_MODULES,
    ...SHARED_MODULES,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleID),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class SharedModule {}
