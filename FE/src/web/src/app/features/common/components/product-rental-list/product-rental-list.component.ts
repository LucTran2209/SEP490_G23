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
  selectedValue = null;
  productList: ProductOutputDto[] = [];
  totalProducts = 0;     
  currentPage = 1;    
  pageSize = 12;
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
    this.loadingService.setLoading();
    this.loadProducts(this.currentPage, this.pageSize);
    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
      this.currentPage = +params['page'] || 1;
      this.loadProducts(this.currentPage, this.pageSize, this.searchText);
    }); 
  }
  loadProducts(pageIndex: number, pageSize: number, search?: string) {
    this.loadingService.setLoading();
    this.productService.listProduct(pageIndex, pageSize, search).subscribe((res: ProductResultService) => {
      this.productList = res.data.items;
      console.log(res.data.items[0].productImages);
      this.totalProducts = res.data.totalCount;
      this.loadingService.setOtherLoading('loaded');
    });
  }
  handlePageChange(page: number): void {
    this.currentPage = page; // Update current page
    // Update the URL with the current page number
    this.router.navigate([], {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge', // This will merge with existing parameters
    });
  }
}
