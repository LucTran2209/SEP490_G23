import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductInputDto, ProductOutputDto, ProductResultService, UpdateProductInputDto } from '../../../../interfaces/product.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductService } from '../../../../services/product.service';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ImageFileService } from '../../../../services/image-file.service';
import { RentalShopService } from '../../../../services/rental-shop.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { RentalShopResultService } from '../../../../interfaces/rental-shop.interface';
import { LoadingService } from '../../../../services/loading.service';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';

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
  searchText: string = '';
  loading$?: Observable<StatusProcess>;
  alertType: 'success' | 'error' = 'success';
  constructor(private modal: NzModalService, 
    private productService: ProductService,
    private storageService: StorageService,
    private cdRef: ChangeDetectorRef,
    private store: Store<FeatureAppState>,
    private message: NzMessageService,
    private imageFileService: ImageFileService,
    private rentalShopService: RentalShopService,
    private userProfileService: UserProfileService,
    private loadingService: LoadingService,
  ) {
    this.loading$ = this.loadingService.status$;
  }
  
  async showProductModal(prodId?: string){
    this.isVisible = true;
    if (prodId) {
      // Update mode: Load the product information for the provided ID
      // const product = this.getProductById(prodId);
      const product = await this.getProductById(prodId);
      
      this.currentId = prodId;
      console.log(this.currentId);
      
      if (product) {
        this.isEditMode = true;
        this.productInformation = product;
        console.log(this.productInformation);
        this.title = 'Cập nhật Sản phẩm';
      } else {
        this.isEditMode = false;
        this.title = 'Tạo mới Sản phẩm';
      }
    } else {
      this.isEditMode = false;
      this.title = 'Tạo mới Sản phẩm';
    }
  }
  handleCloseModal(){
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.userid = this.userProfileService.UserId;
    this.loadingService.setLoading();
    this.rentalShopService.getRentalShop(this.userid).subscribe((res: RentalShopResultService) => {
      // this.shopid = res.data.id;
      // this.loadProducts(this.shopid, this.currentPage, this.pageSize);
      if (res && res.data && res.data.id) {
        this.shopid = res.data.id;
        
        // Sau khi có shopid, tiến hành tải danh sách sản phẩm
        this.loadProducts(this.shopid, this.currentPage, this.pageSize);
      } else {
        console.error('Failed to retrieve shop ID');
        this.message.error('Không thể tải thông tin cửa hàng');
      }
    });
    this.title = 'Thông tin Thiết Bị';
  }
  
  loadProducts(rentalShopId: string ,pageIndex: number, pageSize: number, search?: string){
    this.loadingService.setLoading();
    this.productService.listProductByShop(rentalShopId, pageIndex, pageSize, search).subscribe((res: ProductResultService) =>{
      this.productList = res.data.items;
      this.totalProducts = res.data.totalCount;
      this.loadingService.setOtherLoading('loaded');
      console.log(res)
    });
    // this.store.dispatch(AdminActions.load_users({ pageIndex, pageSize }));
  }
  handlePageChange(page: number): void {
    this.currentPage = page; // Cập nhật trang hiện tại
    this.loadProducts(this.shopid, this.currentPage, this.pageSize); // Gọi lại hàm loadProducts với trang mới
}
  handleCreateProduct(productData: FormData): void {
    //chưa có get rentalshopId nên tự viết id trong database ở đây
      productData.append('rentalShopId', this.shopid);

      this.productService.createProduct(productData).subscribe({
        next: (response) => {
          this.message.success('Tạo Sản Phẩm Mới Thành Công!');
          this.handleCloseModal();
          console.log('Product created successfully!');
          this.loadProducts(this.shopid, this.currentPage, this.pageSize);
          
        },
        error: (error) => {
          this.alertMessage = 'Lưu sản phẩm thất bại!';
          this.showAlert = true;
          this.alertType = 'error';
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
          console.error('Failed to create Product');
        }
      });
  }
  handleUpdateProduct(product: FormData){
    this.productService.updateProduct(this.currentId, product).subscribe({
      next: (res) => {
        this.message.success('Cập nhật sản phẩm thành công!');
        this.handleCloseModal();
        this.loadProducts(this.shopid, this.currentPage, this.pageSize);
      },
      error: () => {
        this.alertMessage = 'Cập nhật sản phẩm thất bại!';
        this.alertType = 'error';
        this.showAlert = true;
        setTimeout(() => {
          this.handleCloseModal();
          this.showAlert = false;
        }, 5000);
      }
    });

  }
  onSearch(){
    this.loadProducts(this.shopid, this.currentPage,this.pageSize, this.searchText);
  }
  async getProductById(productId: string): Promise<UpdateProductInputDto | undefined> {
    const product = this.productList.find(product => product.id === productId);
    this.currentId = productId;
    if (product) {
    //   const imageFiles: File[] = await Promise.all(
    //     product.images.map(async (imageUrl, index) => {
    //       const response = await fetch(imageUrl);
    //       const blob = await response.blob();
    //       return new File([blob], `image-${index}.jpg`, { type: blob.type });
    //     })
    // );
      return {
        productName: product.productName,
        description: product.description,
        quantity: product.quantity,
        rentalPrice: product.rentalPrice,
        depositPrice: product.depositPrice,
        rentalLimitDays: product.rentalLimitDays,
        evaluate: product.evaluate,
        // images: imageFiles
        images: await this.imageFileService.fetchImagesAsFiles(product.images)
      };
    }
    return undefined;
  }
}