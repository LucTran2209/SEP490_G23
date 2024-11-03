import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { environment } from '../../../environments/environment.development';
import { NumberOnlyDirective } from '../../directives/number-only.directive';
import { ErrorComponent } from '../../features/error/error.component';
import { AnonymousComponent } from '../anonymous/anonymous.component';
import { ChatComponent } from '../chat/chat.component';
import { CommentComponent } from '../comment/comment.component';
import { BreadcrumbComponent } from '../core/breadcrumb/breadcrumb.component';
import { CategoryCardComponent } from '../core/card/category-card/category-card.component';
import { FeelbackCardComponent } from '../core/card/feelback-card/feelback-card.component';
import { OrderCardComponent } from '../core/card/order-card/order-card.component';
import { PostCardComponent } from '../core/card/post-card/post-card.component';
import { ProductCardComponent } from '../core/card/product-card/product-card.component';
import { ShopCardComponent } from '../core/card/shop-card/shop-card.component';
import { FooterComponent } from '../core/footer/footer.component';
import { FormFeedbackComponent } from '../core/form/form-feedback/form-feedback.component';
import { FormOrderComponent } from '../core/form/form-order/form-order.component';
import { FormPostComponent } from '../core/form/form-post/form-post.component';
import { FormProductComponent } from '../core/form/form-product/form-product.component';
import { FormRentalProductV2Component } from '../core/form/form-rental-product-v2/form-rental-product-v2.component';
import { FormRentalProductComponent } from '../core/form/form-rental-product/form-rental-product.component';
import { FormRentalRegistrationComponent } from '../core/form/form-rental-registration/form-rental-registration.component';
import { FormUserComponent } from '../core/form/form-user/form-user.component';
import { InputComponent } from '../core/input/input.component';
import { LoadingComponent } from '../core/loading/loading.component';
import { NavMenuComponent } from '../core/nav-menu/nav-menu.component';
import { NavbarHeadearComponent } from '../core/navbar-headear/navbar-headear.component';
import { SelectItemComponent } from '../core/select/select-item/select-item.component';
import { SvgIconComponent } from '../core/svg-icon/svg-icon.component';
import { UserNavbarHeaderComponent } from '../core/user-navbar-header/user-navbar-header.component';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { HeaderTableComponent } from '../header-table/header-table.component';
import { InfoShopComponent } from '../info-shop/info-shop.component';
import { SidebarLayoutComponent } from '../layout/sidebar-layout/sidebar-layout.component';
import { PickerTimerComponent } from '../modal/picker-timer/picker-timer.component';
import { ProductCarouseComponent } from '../product-carouse/product-carouse.component';
import { RatingProccessProductComponent } from '../rating-proccess-product/rating-proccess-product.component';
import { RentalPeriodComponent } from '../rental-period/rental-period.component';
import { RenterItemComponent } from '../renter-item/renter-item.component';
import { StatusLabelComponent } from '../status-label/status-label.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { ViewMoreItemComponent } from '../view-more-item/view-more-item.component';
import { SelectRadioPaymentMethodComponent } from '../core/radio/select-radio-payment-method/select-radio-payment-method.component';
import { SelectRadioRentalDayComponent } from '../core/radio/select-radio-rental-day/select-radio-rental-day.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ConfimOrderProcessComponent } from '../modal/confim-order-process/confim-order-process.component';
import { PriceListComponent } from '../price-list/price-list.component';
import { SelectRadioCollateralComponent } from '../core/radio/select-radio-collateral/select-radio-collateral.component';
import { UploadListComponent } from '../core/upload/upload-list/upload-list.component';

registerLocaleData(en);

const ANTD_MODULES = [
  NzDividerModule,
  NzTagModule,
  NzAutocompleteModule,
  NzDrawerModule,
  NzSpaceModule,
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
  NzMessageModule,
  NzTimelineModule,
];

const MATERIAL_MODULES = [MatButtonModule, MatSnackBarModule, MatInputModule];
const SHARED_MODULES = [
  SelectRadioCollateralComponent,
  UploadListComponent,
  PriceListComponent,
  ConfimOrderProcessComponent,
  CategoryCardComponent,
  StatusLabelComponent,
  HeaderTableComponent,
  FormOrderComponent,
  SelectRadioPaymentMethodComponent,
  SelectRadioRentalDayComponent,
  RenterItemComponent,
  InfoShopComponent,
  RentalPeriodComponent,
  PickerTimerComponent,
  FormRentalProductComponent,
  InputComponent,
  SidebarLayoutComponent,
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
  ProductCarouseComponent,
  ViewMoreItemComponent,
  RatingProccessProductComponent,
  ErrorComponent,
  ViewMoreItemComponent,
  FormPostComponent,
  FormRentalRegistrationComponent,
  PostCardComponent,
  FormProductComponent,
  ShopCardComponent,
  OrderCardComponent,
  FormFeedbackComponent,
  FeelbackCardComponent,
  FormRentalProductV2Component,
];

@NgModule({
  declarations: [...SHARED_MODULES],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...ANTD_MODULES,
    ...MATERIAL_MODULES,
    SlickCarouselModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...ANTD_MODULES,
    ...MATERIAL_MODULES,
    ...SHARED_MODULES,
    SlickCarouselModule,
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
