import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductInputDto, ProductOutputDto, ProductResultService, UpdateProductInputDto } from '../../../../interfaces/product.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductService } from '../../../../services/product.service';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { ImageFileService } from '../../../../services/image-file.service';
import { RentalShopService } from '../../../../services/rental-shop.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { RentalShopResultService } from '../../../../interfaces/rental-shop.interface';
import { LoadingService } from '../../../../services/loading.service';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageResponseService } from '../../../../services/message-response.service';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { selectSortByOrderProduct } from '../../../../configs/product.config';

@Component({
  selector: 'app-manager-shop',
  templateUrl: './manager-shop.component.html',
  styleUrl: './manager-shop.component.scss',
})
export class ManagerShopComponent  implements OnInit{
  isVisible : boolean = false;
  productList: ProductOutputDto[] = [];
  productInformation!: UpdateProductInputDto;
  title: string = '';
  totalProducts = 0;     
  currentPage = 1;    
  pageSize = 12;  
  isEditMode: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  currentId: string = '';
  userid: string = '';
  shopid: string = '';
  shopName: string = '';
  searchText: string = '';
  productListNull = true;
  selectedValue = null;
  loading$?: Observable<StatusProcess>;
  groupOptionFilterSelect: OptionSelect[] = selectSortByOrderProduct;
  alertType: 'success' | 'error' = 'success';
  constructor(private modal: NzModalService, 
    private productService: ProductService,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef,
    private store: Store<FeatureAppState>,
    private imageFileService: ImageFileService,
    private rentalShopService: RentalShopService,
    private userProfileService: UserProfileService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageResponseService,
  ) {
    this.loading$ = this.loadingService.status$;
  }
  async showProductModal(prodId?: string) {
    this.isVisible = true; // Show modal immediately
    this.isEditMode = !!prodId; // Set edit mode based on prodId
    this.title = prodId ? 'Cập nhật Sản phẩm' : 'Tạo mới Sản phẩm';
  
    if (prodId) {
      // Preload form with initial data while loading images asynchronously
      const product = this.productList.find(p => p.id === prodId);
      if (product) {
        try {
          // Fetch images asynchronously and update productInformation
          const imagess = await this.imageFileService.fetchImagesAsFiles(product.images);
  
          this.productInformation = {
            productName: product.productName,
            description: product.description,
            quantity: product.quantity,
            rentalPrice: product.rentalPrice,
            depositPrice: product.depositPrice,
            rentalLimitDays: product.rentalLimitDays,
            evaluate: product.evaluate,
            images: imagess
          };
          this.currentId = prodId;
          // Trigger change detection manually to update the template
          this.cdRef.detectChanges();
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      }
    } else {
      this.productInformation = {
        productName: '',
        description: '',
        quantity: 0,
        rentalPrice: 0,
        depositPrice: 0,
        rentalLimitDays: 0,
        evaluate: 0,
        images: []
      };
    }
  }
  handleCloseModal(){
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.loadingService.setLoading();
    this.route.params.subscribe(params => {
      this.shopid = params['id']; // Get rentalShopId from route params
      if (this.shopid) {
        this.rentalShopService.getRentalShop(this.shopid).subscribe((res: RentalShopResultService) => {
          this.shopName = res.data.shopName;
          this.loadProducts(this.shopid, this.currentPage, this.pageSize);    
      });
      }
    });
    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
      this.currentPage = +params['page'] || 1; // Set currentPage from URL or default to 1
      this.loadProducts(this.shopid, this.currentPage, this.pageSize, this.searchText);
    }); 
    this.title = 'Thông tin Thiết Bị';
  }
  
  loadProducts(rentalShopId: string ,pageIndex: number, pageSize: number, search?: string){
    this.loadingService.setLoading();
    this.productService.listProductByShop(rentalShopId, pageIndex, pageSize, search).subscribe((res: ProductResultService) =>{
      this.productList = res.data.items;
      this.productListNull = !this.productList || this.productList.length === 0;
      this.totalProducts = res.data.totalCount;
      this.loadingService.setOtherLoading('loaded');
      console.log(res)
    });
    // this.store.dispatch(AdminActions.load_users({ pageIndex, pageSize }));
  }
  handlePageChange(page: number): void {
    this.currentPage = page; // Update current page
    // Update the URL with the current page number
    this.router.navigate([], {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge', // This will merge with existing parameters
    });
  
    this.loadProducts(this.shopid, this.currentPage, this.pageSize); // Call loadProducts with new page
  }
  handleCreateProduct(productData: FormData): void {
    //chưa có get rentalshopId nên tự viết id trong database ở đây
      productData.append('rentalShopId', this.shopid);

      this.productService.createProduct(productData).subscribe({
        next: (response) => {
          this.messageService.showSuccess('Tạo Sản Phẩm Mới Thành Công!');
          this.handleCloseModal();
          console.log('Product created successfully!');
          this.loadProducts(this.shopid, this.currentPage, this.pageSize);
          
        },
        error: (error) => {
          this.messageService.handleError('Lưu sản phẩm thất bại!');
          console.error('Failed to create Product');
        }
      });
  }
  handleUpdateProduct(product: FormData){
    this.productService.updateProduct(this.currentId, product).subscribe({
      next: (res) => {
        this.messageService.showSuccess('Cập nhật sản phẩm thành công!');
        this.handleCloseModal();
        this.loadProducts(this.shopid, this.currentPage, this.pageSize);
      },
      error: () => {
        this.messageService.handleError('Cập nhật sản phẩm thất bại!');
      }
    });

  }
  onSearch(){
   // Update the URL with the current search text
   this.router.navigate([], {
    queryParams: { search: this.searchText },
    queryParamsHandling: 'merge', // This will merge with existing parameters
  });
    this.loadProducts(this.shopid, this.currentPage,this.pageSize, this.searchText);
  }
}