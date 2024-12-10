import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeVI from '@angular/common/locales/vi';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CodeInputComponent, CodeInputModule } from 'angular-code-input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
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
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { environment } from '../../../environments/environment.development';
import { NumberOnlyDirective } from '../../directives/number-only.directive';
import { ChatHeaderComponent } from '../../features/chat/chat-header/chat-header.component';
import { ChatInputComponent } from '../../features/chat/chat-input/chat-input.component';
import { ChatListComponent } from '../../features/chat/chat-list/chat-list.component';
import { ChatMessageComponent } from '../../features/chat/chat-message/chat-message.component';
import { ChatComponent } from '../../features/chat/chat-popup/chat.component';
import { ErrorComponent } from '../../features/error/error.component';
import { NotificationPopupComponent } from '../../features/notification/components/notification-popup/notification-popup.component';
import { DateFirebasePipe } from '../../pipes/date-firebase.pipe';
import { AnonymousComponent } from '../anonymous/anonymous.component';
import { BaseComponentsComponent } from '../base-components/base-components.component';
import { CommentComponent } from '../comment/comment.component';
import { BreadcrumbComponent } from '../core/breadcrumb/breadcrumb.component';
import { CardStaticComponent } from '../core/card/card-static/card-static.component';
import { CategoryCardComponent } from '../core/card/category-card/category-card.component';
import { FeelbackCardComponent } from '../core/card/feelback-card/feelback-card.component';
import { OrderCardComponent } from '../core/card/order-card/order-card.component';
import { PostCardComponent } from '../core/card/post-card/post-card.component';
import { ProductCardComponent } from '../core/card/product-card/product-card.component';
import { RequestShopCardComponent } from '../core/card/request-shop-card/request-shop-card.component';
import { ShopCardComponent } from '../core/card/shop-card/shop-card.component';
import { VoucherCardComponent } from '../core/card/voucher-card/voucher-card.component';
import { FooterComponent } from '../core/footer/footer.component';
import { FormDeactiveShopComponent } from '../core/form-deactive-shop/form-deactive-shop.component';
import { FormCancelOrderComponent } from '../core/form/form-cancel-order/form-cancel-order.component';
import { FormCategoryComponent } from '../core/form/form-category/form-category.component';
import { FormConfirmComponent } from '../core/form/form-confirm/form-confirm.component';
import { FormFeedbackComponent } from '../core/form/form-feedback/form-feedback.component';
import { FormOrderComponent } from '../core/form/form-order/form-order.component';
import { FormPostComponent } from '../core/form/form-post/form-post.component';
import { FormProductComponent } from '../core/form/form-product/form-product.component';
import { FormRechargeComponent } from '../core/form/form-recharge/form-recharge.component';
import { FormRentalProductV2Component } from '../core/form/form-rental-product-v2/form-rental-product-v2.component';
import { FormRentalProductComponent } from '../core/form/form-rental-product/form-rental-product.component';
import { FormRentalRegistrationComponent } from '../core/form/form-rental-registration/form-rental-registration.component';
import { FormSearchVoucherComponent } from '../core/form/form-search-voucher/form-search-voucher.component';
import { FormSubcategoryComponent } from '../core/form/form-subcategory/form-subcategory.component';
import { FormUserComponent } from '../core/form/form-user/form-user.component';
import { FormVoucherComponent } from '../core/form/form-voucher/form-voucher.component';
import { HeaderShopComponent } from '../core/header-shop/header-shop.component';
import { InputAddressComponent } from '../core/input-address/input-address.component';
import { InputComponent } from '../core/input/input.component';
import { LoadingComponent } from '../core/loading/loading.component';
import { NavMenuComponent } from '../core/nav-menu/nav-menu.component';
import { NavbarHeadearComponent } from '../core/navbar-headear/navbar-headear.component';
import { SelectRadioCollateralComponent } from '../core/radio/select-radio-collateral/select-radio-collateral.component';
import { SelectRadioPaymentMethodComponent } from '../core/radio/select-radio-payment-method/select-radio-payment-method.component';
import { SelectRadioRentalDayComponent } from '../core/radio/select-radio-rental-day/select-radio-rental-day.component';
import { SelectDateRangeComponent } from '../core/select/select-date-range/select-date-range.component';
import { SelectItemComponent } from '../core/select/select-item/select-item.component';
import { SelectViewStatisticComponent } from '../core/select/select-view-statistic/select-view-statistic.component';
import { SvgIconComponent } from '../core/svg-icon/svg-icon.component';
import { UploadListComponent } from '../core/upload/upload-list/upload-list.component';
import { UserNavbarHeaderComponent } from '../core/user-navbar-header/user-navbar-header.component';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { HeaderTableComponent } from '../header-table/header-table.component';
import { InfoShopComponent } from '../info-shop/info-shop.component';
import { SidebarLayoutComponent } from '../layout/sidebar-layout/sidebar-layout.component';
import { ChangeStatusOrderComponent } from '../modal/change-status-order/change-status-order.component';
import { ChooseCreateCategoryComponent } from '../modal/choose-create-category/choose-create-category.component';
import { ConfimOrderProcessComponent } from '../modal/confim-order-process/confim-order-process.component';
import { ConfirmDeleteRequestOrderComponent } from '../modal/confirm-delete-request-order/confirm-delete-request-order.component';
import { DetailVoucherAvailableComponent } from '../modal/detail-voucher-available/detail-voucher-available.component';
import { ListVoucherAvailableComponent } from '../modal/list-voucher-available/list-voucher-available.component';
import { PickerTimerComponent } from '../modal/picker-timer/picker-timer.component';
import { NotificationItemComponent } from '../notification-item/notification-item.component';
import { PriceListComponent } from '../price-list/price-list.component';
import { ProductCarouseComponent } from '../product-carouse/product-carouse.component';
import { ProductRelatedComponent } from '../product-related/product-related.component';
import { RatingProccessProductComponent } from '../rating-proccess-product/rating-proccess-product.component';
import { RentalPeriodComponent } from '../rental-period/rental-period.component';
import { RenterItemComponent } from '../renter-item/renter-item.component';
import { StatusLabelComponent } from '../status-label/status-label.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { ViewMoreItemComponent } from '../view-more-item/view-more-item.component';
registerLocaleData(localeVI);

const ANTD_MODULES = [
  NzAnchorModule,
  NzImageModule,
  NzPopconfirmModule,
  NzStatisticModule,
  NzNotificationModule,
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
  NzTypographyModule,
  NzCollapseModule,
];
const MATERIAL_MODULES = [
  MatDialogModule,
  MatButtonModule,
  MatSnackBarModule,
  MatInputModule,
  MatMenuModule,
];
const SHARED_MODULES = [
  ChooseCreateCategoryComponent,
  BaseComponentsComponent,
  DetailVoucherAvailableComponent,
  ListVoucherAvailableComponent,
  ConfirmDeleteRequestOrderComponent,
  NotificationPopupComponent,
  NotificationItemComponent,
  SelectDateRangeComponent,
  SelectViewStatisticComponent,
  ChangeStatusOrderComponent,
  ChatListComponent,
  ChatMessageComponent,
  ChatInputComponent,
  ChatHeaderComponent,
  ChatComponent,
  DateFirebasePipe,
  ProductRelatedComponent,
  CardStaticComponent,
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
  ProductRelatedComponent,
  RequestShopCardComponent,
  HeaderShopComponent,
  FormSearchVoucherComponent,
  FormVoucherComponent,
  FormRechargeComponent,
  FormDeactiveShopComponent,
  InputAddressComponent,
  VoucherCardComponent,
  FormCancelOrderComponent,
  FormConfirmComponent,
  FormCategoryComponent,
  FormSubcategoryComponent,
];

@NgModule({
  declarations: [...SHARED_MODULES],
  imports: [
    CodeInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...ANTD_MODULES,
    ...MATERIAL_MODULES,
    SlickCarouselModule,
  ],
  exports: [
    CodeInputComponent,
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
    { provide: LOCALE_ID, useValue: 'vi' },
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
    DateFirebasePipe,
    DatePipe,
  ],
})
export class SharedModule {}
