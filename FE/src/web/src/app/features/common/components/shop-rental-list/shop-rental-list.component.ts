import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalShop } from '../../../../interfaces/rental-shop.interface';
import { ProductService } from '../../../../services/product.service';
import { LoadingService } from '../../../../services/loading.service';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { ProductDtoResponse, SearchProduct } from '../../../../interfaces/product.interface';

@Component({
  selector: 'app-shop-rental-list',
  templateUrl: './shop-rental-list.component.html',
  styleUrl: './shop-rental-list.component.scss'
})
export class ShopRentalListComponent implements OnInit {
  search!: string;
  shopList: RentalShop[] = []; 
  totalProducts = 0;     
  currentPage = 1;    
  pageSize = 12;
  loading$?: Observable<StatusProcess>;
  searchProduct!: SearchProduct;
  constructor(
    private productService: ProductService,
    private router: Router,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
  ) {
    this.loading$ = this.loadingService.status$;
  }

  ngOnInit() {
    // Subscribe to the query parameters and access the 'search' parameter
    this.route.queryParamMap.subscribe(params => {
      this.search = params.get('search') || '';

      // Now you can use the search term (e.g., to filter products, load related items, etc.)
      this.loadShops();
    });
  }
  loadShops(){
    const productRequest: SearchProduct = {
      pageSize: this.pageSize,
      pageIndex: this.currentPage,
      search: this.search?.trim() || undefined, // Nếu không có, đặt undefined
    };
    this.productService.listProduct(productRequest).subscribe((res: ProductDtoResponse) => {
      this.shopList = res.data.rentalShops;
      console.log(this.search);
      this.loadingService.setOtherLoading('loaded');
    });
  }
}
