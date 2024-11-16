import { Component } from '@angular/core';
import { PostOutputDto, PostResultService } from '../../../../interfaces/post.interface';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { PostService } from '../../../../services/post.service';
import { selectSortByOrder } from '../../../../configs/post.config';
import { ProductImage, ProductOutputDto, ProductResultService } from '../../../../interfaces/product.interface';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-rental-list',
  templateUrl: './product-rental-list.component.html',
  styleUrl: './product-rental-list.component.scss'
})
export class ProductRentalListComponent {
  search!: string;
  selectedValue = null;
  productList: ProductOutputDto[] = [];
  totalProducts = 0;     
  currentPage = 1;    
  pageSize = 12;
  subCategory: string = '';
  searchText: string = '';
  groupOptionFilterSelect: OptionSelect[] = selectSortByOrder;
  loading$?: Observable<StatusProcess>;
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
  ) {
    this.loading$ = this.loadingService.status$;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Lấy tham số từ URL
      this.search = params['search'] || '';
      this.searchText = params['searchText'] || '';
      this.subCategory = params['subCategory'] || '';
      this.currentPage = +params['page'] || 1;

      // Tải danh sách sản phẩm dựa vào tham số hiện tại
      this.loadProducts();
    });

    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug'); // Lấy `slug` từ URL
      const caid = params.get('id'); // Lấy `caid` từ URL nếu có
      
      if (slug && caid) {
        // Chỉ khi URL có cả `slug` và `caid`, thì mới gán vào `subCategory`
        this.subCategory = slug;
      } else {
        this.subCategory = ''; // Nếu không có, xóa subCategory
      }

      // Tải lại sản phẩm với subCategory mới (nếu có)
      this.loadProducts();
    });
  }

  loadProducts() {
    // Xác định thuật ngữ tìm kiếm sẽ sử dụng
    const searchTerm = this.search || this.searchText || this.subCategory;

    this.loadingService.setLoading();
    this.productService.listProduct(this.currentPage, this.pageSize, searchTerm).subscribe((res: ProductResultService) => {
      this.productList = res.data.items;
      this.totalProducts = res.data.totalCount;
      this.loadingService.setOtherLoading('loaded');
    });
  }

  handlePageChange(page: number): void {
    this.currentPage = page; // Cập nhật trang hiện tại
    this.updateQueryParams();
  }

  updateQueryParams() {
    // Cập nhật URL với tham số hiện tại
    this.router.navigate([], {
      queryParams: {
        search: this.search || null,
        searchText: this.searchText || null,
        subCategory: this.subCategory || null,
        page: this.currentPage
      },
      queryParamsHandling: 'merge', // Gộp với các tham số có sẵn
    });
  }

  goAllShopRelated() {
    const searchTerm = 'dfdsf'; // Thiết lập từ khóa tìm kiếm
    this.router.navigate(['/common/shopList'], { queryParams: { search: searchTerm } });
  }

  onSearch() {
    this.currentPage = 1; // Đặt lại về trang 1 khi thực hiện tìm kiếm mới
    this.updateQueryParams();
    this.loadProducts();
  }
}
