import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, Observable, Subscription } from 'rxjs';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { selectSortByOrder } from '../../../../configs/post.config';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { ProductDtoResponse, ProductOutputDto, SearchProduct } from '../../../../interfaces/product.interface';
import { RentalShop } from '../../../../interfaces/rental-shop.interface';
import { LoadingService } from '../../../../services/loading.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-rental-list',
  templateUrl: './product-rental-list.component.html',
  styleUrl: './product-rental-list.component.scss'
})
export class ProductRentalListComponent {
  search = '';
  selectedValue = null;
  productList: ProductOutputDto[] = [];
  locations: string[] = [];
  shop!: RentalShop;
  totalProducts = 0;
  currentPage = 1;
  pageSize = 12;
  subCategory = '';
  subcategoryFilter = '';
  searchText = '';
  groupOptionFilterSelect: OptionSelect[] = selectSortByOrder;
  searchProduct: SearchProduct = {
    pageSize: this.pageSize,
    pageIndex: this.currentPage,
    search: '',
    subCategory: [],
    addresses: [],
    minPrice: 0,
    maxPrice: 0,
  };
  loading$?: Observable<StatusProcess>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.loading$ = this.loadingService.status$;
  }

  ngOnInit(): void {
      // Theo dõi thay đổi từ queryParams và paramMap
  this.subscriptions.add(
    combineLatest([
      this.route.paramMap,
      this.route.queryParams
    ]).subscribe(([paramMap, queryParams]) => {
      // Lấy giá trị từ paramMap và queryParams
      const caid = paramMap.get('id');
      this.subCategory = caid || queryParams['subCategory'] || ''; // Ưu tiên paramMap trước

      this.search = queryParams['search'] || '';
      this.currentPage = +queryParams['page'] || 1;

      // Gọi API chỉ khi các giá trị đã được xử lý
      this.loadProducts();
    })
  );
  }
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.unsubscribe();
  }

  private resetPaginationAndReload(): void {
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadProducts();
  }

  private updateQueryParams(): void {
    this.router.navigate([], {
      queryParams: {
        search: this.search || null,
        subCategory: this.subCategory || null,
        page: this.currentPage,
      },
      queryParamsHandling: 'merge',
    });
  }

  loadProducts(): void {
    const productRequest: SearchProduct = {
      pageSize: this.pageSize,
      pageIndex: this.currentPage,
      search: this.search?.trim() || undefined, // Nếu không có, đặt undefined
      subCategory: this.subCategory ? this.subCategory.split(',') : undefined,
      addresses: this.locations?.length ? this.locations : undefined,
      minPrice: this.searchProduct.minPrice || undefined,
      maxPrice: this.searchProduct.maxPrice || undefined,
    };

    // Start loading spinner
    this.loadingService.setLoading();

    // API Call to fetch products
    this.productService.listProduct(productRequest).subscribe({
      next: (res: ProductDtoResponse) => {
        this.productList = res.data.products.items;
        this.shop = res.data.rentalShops[0];
        console.log(res.data.rentalShops[0]);
        this.totalProducts = res.data.products.totalCount;
        this.loadingService.setOtherLoading('loaded');
        this.cdRef.markForCheck();
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loadingService.setOtherLoading('error');
        this.cdRef.markForCheck();
      },
    });
  }

  handlePageChange(page: number): void {
    this.currentPage = page;
    this.updateQueryParams();
    this.loadProducts();
  }

  onSearch(): void {
    this.resetPaginationAndReload();
  }

  onLocationsSelected(locations: string[]): void {
    this.locations = locations;
    this.searchProduct.addresses = locations;
    this.resetPaginationAndReload();
    console.log('Locations selected:', locations);
  }

  onSubCategorySelected(subcategory: string): void {
    const subCategoriesSet = new Set(this.subCategory.split(',').filter(Boolean));
    subCategoriesSet.add(subcategory);
    this.subCategory = Array.from(subCategoriesSet).join(',');
    this.searchProduct.subCategory = Array.from(subCategoriesSet);
    this.resetPaginationAndReload();
    console.log('Subcategories selected:', this.subCategory);
  }

  onPriceRangeSelected(range: number[]): void {
    this.searchProduct.minPrice = range[0];
    this.searchProduct.maxPrice = range[1];
    this.resetPaginationAndReload();
    console.log('Price range selected:', range);
  }

  goAllShopRelated(): void {
    this.router.navigate(['/common/shopList'], { queryParams: { search: this.search } });
  }
  
}
