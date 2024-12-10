import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, mergeMap, Observable, of, Subscription } from 'rxjs';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { selectSortByOrder } from '../../../../configs/post.config';
import { ProductOutputDto } from '../../../../interfaces/product.interface';
import { RentalShopOutputDto } from '../../../../interfaces/rental-shop.interface';
import { categoryOptions } from '../../../../mock/post';
import { NavigationService } from '../../../../services/navigation.service';
import { RentalShopService } from '../../../../services/rental-shop.service';
import { FeatureAppState } from '../../../../store/app.state';
import { updateFilter } from '../../../../store/filters/filter.actions';
import { FilterParameters } from '../../../../store/filters/filter.reducers';
import * as ShopRentalProductActions from '../../state/shop/shop-personal.actions';
import * as selectShopRentalProduct from '../../state/shop/shop-personal.reducer';
import { VoucherDetailOutputDto, VoucherDetailResultService, VoucherOutputDto, VoucherResultService } from '../../../../interfaces/voucher.interface';
import { VoucherService } from '../../../../services/voucher.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { StorageService } from '../../../../services/storage.service';
import { LocalStorageKey } from '../../../../utils/constant';
import { UserProfileService } from '../../../../services/user-profile.service';
@Component({
  selector: 'app-shop-personal',
  templateUrl: './shop-personal.component.html',
  styleUrl: './shop-personal.component.scss',
})
export class ShopPersonalComponent implements OnInit, OnDestroy {
  vouchers!: VoucherOutputDto[];
  voucherExist!: VoucherDetailOutputDto[];
  //infoShop
  shopInfo$: Observable<RentalShopOutputDto | null> = of(null);
  // param shop url
  paramHave: string | null;
  productListShopFilter$?: Observable<ProductOutputDto[]>;
  pageIndex$?: Observable<number>;
  pageTotal$?: Observable<number>;
  pageSize$?: Observable<number>;
  // pagination
  categoryOptions = categoryOptions;
  selectedValue = null;
  groupOptionFilterSelect: OptionSelect[] = selectSortByOrder;
  visible = false;
  currentUserId: string | undefined;

  //subscription
  subScription?: Subscription;

  open(isOpen: boolean): void {
    this.visible = isOpen;
  }

  close(): void {
    this.visible = false;
  }

  selectStateFromNgRx() {
    this.productListShopFilter$ = this.store.select(
      selectShopRentalProduct.selectProductItemResponse
    );
    this.pageIndex$ = this.store.select(
      selectShopRentalProduct.selectPageIndex
    );
    this.pageSize$ = this.store.select(selectShopRentalProduct.selectPageSize);
    this.pageTotal$ = this.store.select(
      selectShopRentalProduct.selectTotalCount
    );
  }

  onPageIndexChange(val: number) {
    this.store.dispatch(updateFilter({ filters: { pageIndex: val } }));
    this.navigateService.updateParams({ pageIndex: val });
  }

  dispatchActionNessarray() {
    if (this.paramHave) {
      this.store.dispatch(
        ShopRentalProductActions.getListProductRentalShop({
          shopId: this.paramHave,
        })
      );
    }
  }

  onQueryParams() {
    this.route.paramMap
      .pipe(
        map((params) => {
          const filters: Partial<FilterParameters> = {
            pageIndex: +(params.get('pageIndex') ?? '1'),
            search: params.get('search') || '',
            orderBy: params.get('orderBy') || '',
            orderByDesc: params.get('orderByDesc') === 'true',
            thenBy: params.get('thenBy') || '',
            thenByDesc: params.get('thenByDesc') === 'true',
          };

          return filters;
        })
      )
      .subscribe((filters) => {
        this.store.dispatch(updateFilter({ filters }));
        this.navigateService.updateParams(filters);
      });
  }

  loadShopInfo() {
    this.shopInfo$ = this.rentalShopService
      .getRentalShop(this.paramHave ?? '')
      .pipe(
        mergeMap((res) => {
          return of(res.data);
        })
      );
  }

  ngOnInit(): void {
    this.dispatchActionNessarray();
    this.selectStateFromNgRx();
    this.onQueryParams();
    this.loadShopInfo();
    this.onloadVoucher();
    this.myVoucher();
    this.currentUserId = this.userProfileService.UserId;
  }

  ngOnDestroy(): void {
    this.storageService.unset(LocalStorageKey.rangeDate);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FeatureAppState>,
    private navigateService: NavigationService,
    private rentalShopService: RentalShopService,
    private voucherService: VoucherService,
    private messageService: MessageResponseService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef,
    private userProfileService: UserProfileService, 
  ) {
    this.paramHave = this.route.snapshot.paramMap.get('id');
  }
  async onloadVoucher() {
    if (this.paramHave) {
      this.voucherService.listVoucher(this.paramHave).subscribe((res: VoucherResultService) => {
        const currentDate = new Date(); // Ngày và giờ hiện tại
        // Lọc các voucher chưa hết hạn
        this.vouchers = res.data.filter(voucher => {
          const expiryDate = new Date(voucher.expiryDate); // Giả sử voucher có trường expiryDate
          return expiryDate > currentDate; // Chỉ giữ những voucher chưa hết hạn theo cả ngày và giờ
        });
        this.myVoucher();
        this.cdr.detectChanges();
      });
    }
  }
  saveVoucher(voucherId: string){
    this.voucherService.saveVoucher(voucherId).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Lưu Voucher Thành Công!', 3000);
        this.onloadVoucher();
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.messageService.handleError('Lưu Voucher Thất Bại!', 3000);
      }
    });
  }
  myVoucher(){
    this.voucherService.myVoucher().subscribe((res: VoucherDetailResultService) => {
      this.voucherExist = res.data;
      this.cdr.detectChanges();
      setTimeout(() => {
        console.log("My Voucher: ", this.voucherExist);
        if (this.voucherExist && this.voucherExist.length > 0) {
          this.vouchers.forEach(voucher => {
            if (this.voucherExist.some(existingVoucher => existingVoucher.id === voucher.id)) {
              voucher.isSave = true;
            }
          });
          this.cdr.detectChanges();
        }
      }, 0);
    });
  }
}
