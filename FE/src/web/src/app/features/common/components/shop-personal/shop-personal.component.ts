import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { VoucherOutputDto, VoucherResultService } from '../../../../interfaces/voucher.interface';
import { VoucherService } from '../../../../services/voucher.service';
import { MessageResponseService } from '../../../../services/message-response.service';
@Component({
  selector: 'app-shop-personal',
  templateUrl: './shop-personal.component.html',
  styleUrl: './shop-personal.component.scss',
})
export class ShopPersonalComponent implements OnInit, OnDestroy {
  vouchers!: VoucherOutputDto[];
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
  }

  ngOnDestroy(): void {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FeatureAppState>,
    private navigateService: NavigationService,
    private rentalShopService: RentalShopService,
    private voucherService: VoucherService,
    private messageService: MessageResponseService,
  ) {
    this.paramHave = this.route.snapshot.paramMap.get('id');
  }
  async onloadVoucher() {
    if(this.paramHave){
      this.voucherService.listVoucher(this.paramHave).subscribe((res: VoucherResultService) => {
        this.vouchers = res.data
      });
    }
  }
  saveVoucher(voucherId: string){
    this.voucherService.saveVoucher(voucherId).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Lưu Voucher Thành Công!', 3000);
      },
      error: (error) => {
        this.messageService.handleError('Lưu Voucher Thất Bại!', 3000);
      }
    });
  }
}
