import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductInputDto, ProductOutputDto, ProductResultService, UpdateProductInputDto } from '../../../../interfaces/product.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductService } from '../../../../services/product.service';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { ImageFileService } from '../../../../services/image-file.service';
import { RentalShopService } from '../../../../services/rental-shop.service';
import { UserProfileService } from '../../../../services/user-profile.service';
import { RentalShopOutputDto, RentalShopResultService, UpdateRentalShop } from '../../../../interfaces/rental-shop.interface';
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
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('bannerInput') bannerInput!: ElementRef<HTMLInputElement>;
  isVisible : boolean = false;
  productList: ProductOutputDto[] = [];
  productInformation!: UpdateProductInputDto;
  title: string = '';
  totalProducts = 0;     
  total = 0;     
  currentPage = 1;    
  pageSize = 12;  
  isEditMode: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  currentId: string = '';
  userid: string = '';
  shopid: string = '';
  shop!: RentalShopOutputDto;
  searchText: string = '';
  productListNull = true;
  selectedValue = null;
  loading$?: Observable<StatusProcess>;
  groupOptionFilterSelect: OptionSelect[] = selectSortByOrderProduct;
  alertType: 'success' | 'error' = 'success';
  isUpdateShop = false;
  shopData!: UpdateRentalShop;
  avatarUrl: string | null = null; // Thêm biến này để lưu URL của ảnh preview
  bannerUrl: string | null = null; // Thêm biến này để lưu URL của ảnh preview
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
    console.log(this.isEditMode);
    this.title = prodId ? 'Cập nhật Sản phẩm' : 'Tạo mới Sản phẩm';
  
    if (prodId) {
      // Preload form with initial data while loading images asynchronously
      const product = this.productList.find(p => p.id === prodId);
      if (product) {
        try {
          // Fetch images asynchronously and update productInformation
          const imagess = await this.imageFileService.fetchImagesAsFiles(product.images as string[]);
  
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
    } 
  }
  handleCloseModal(){
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.isUpdateShop = false;
    this.loadingService.setLoading();
    this.route.params.subscribe(params => {
      this.shopid = params['id']; // Get rentalShopId from route params
      if (this.shopid) {
        this.loadShop();
      }
    });
    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
      this.currentPage = +params['page'] || 1; // Set currentPage from URL or default to 1
      this.loadProducts(this.shopid, this.currentPage, this.pageSize, this.searchText);
    }); 
    this.title = 'Thông tin Thiết Bị';
  }
  loadShop(){
    this.rentalShopService.getRentalShop(this.shopid).subscribe((res: RentalShopResultService) => {
      this.shop = res.data;
      this.loadProducts(this.shopid, this.currentPage, this.pageSize);  
      console.log("shop: ", res.data);  
  });
  }
  
  loadProducts(rentalShopId: string ,pageIndex: number, pageSize: number, search?: string){
    this.loadingService.setLoading();
    this.productService.listProductByShop(rentalShopId, pageIndex, pageSize, search).subscribe((res: ProductResultService) =>{
      this.productList = res.data.items;
      this.productListNull = !this.productList || this.productList.length === 0;
      this.totalProducts = res.data.totalCount;
      if(!search){
        this.total = res.data.totalCount;
      }
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
      // productData.append('rentalShopId', this.shopid);

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
  calculateTime(inputTime: string | undefined): string {
    if (!inputTime) {
      return 'Không có ngày tạo';
    }
  
    const inputDate = new Date(inputTime);
    const currentDate = new Date();
  
    if (isNaN(inputDate.getTime())) {
      return 'Ngày không hợp lệ';
    }
  
    const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const daysInMonth = 30;
    const monthsInYear = 12;
  
    if (diffInDays > daysInMonth * monthsInYear) {
      const years = Math.floor(diffInDays / (daysInMonth * monthsInYear));
      return `${years} Năm Trước`;
    } else if (diffInDays > daysInMonth) {
      const months = Math.floor(diffInDays / daysInMonth);
      return `${months} Tháng Trước`;
    } else {
      return `${diffInDays} Ngày Trước`;
    }
  }
  triggerFileInput(): void {
    this.fileInput.nativeElement.click(); // Mở hộp thoại chọn file
  }
  triggerBannerInput() {
    this.bannerInput.nativeElement.click();
  }

  handleAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      // Cập nhật avatar với file chọn
      this.shopData.avatarShop = file;
  
      // Tạo URL preview từ file đã chọn
      this.avatarUrl = URL.createObjectURL(file);
    }
  }
  handleBannerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      // Cập nhật avatar với file chọn
      this.shopData.banner = file;
  
      // Tạo URL preview từ file đã chọn
      this.bannerUrl = URL.createObjectURL(file);
    }
  }
  async editShopInfo() {
    this.isUpdateShop = true;
  
    // Kiểm tra và tải avatar
    let avatarFile: File | null = null;
    if (typeof this.shop.avatarShop === 'string' && this.shop.avatarShop) {
      const avatarResponse = await fetch(this.shop.avatarShop);
      const avatarBlob = await avatarResponse.blob();
      avatarFile = new File([avatarBlob], 'avatar.png', { type: avatarBlob.type });
    }
  
    // Kiểm tra và tải banner
    let bannerFile: File | null = null;
    if (typeof this.shop.banner === 'string' && this.shop.banner) {
      const bannerResponse = await fetch(this.shop.banner);
      const bannerBlob = await bannerResponse.blob();
      bannerFile = new File([bannerBlob], 'banner.png', { type: bannerBlob.type });
    }
  
    // Cập nhật shopData
    this.shopData = {
      shopName: this.shop.shopName,
      avatarShop: avatarFile || null,
      banner: bannerFile || null,
    };
    console.log(this.shopData);
  
    // Xử lý avatar preview
    this.avatarUrl = avatarFile ? URL.createObjectURL(avatarFile) : null;
  
    // Xử lý banner preview
    this.bannerUrl = bannerFile ? URL.createObjectURL(bannerFile) : null;
  
    // Gọi ChangeDetectorRef để cập nhật view
    this.cdRef.detectChanges();
  }
  saveChanges() {
    if (
      (this.shopData.avatarShop instanceof File || this.shopData.avatarShop === null) &&
      (this.shopData.banner instanceof File || this.shopData.banner === null)
  ) {
      const formData = new FormData();

      // Thêm các trường dữ liệu khác vào FormData
      formData.append('shopName', this.shopData.shopName);

      // Thêm avatarShop vào FormData nếu có
      if (this.shopData.avatarShop instanceof File) {
          formData.append('avatarShop', this.shopData.avatarShop);
      }

      // Thêm banner vào FormData nếu có
      if (this.shopData.banner instanceof File) {
          formData.append('banner', this.shopData.banner);
      }

      // Gửi request cập nhật
      this.rentalShopService.updateRentalShop(formData, this.shopid).subscribe({
          next: () => {
              this.loadShop();
              this.messageService.showSuccess('Cập nhật thành công!');
          },
          error: () => {
              this.messageService.handleError('Cập nhật thất bại!');
          },
      });
  } else {
      this.messageService.handleError('Ảnh đại diện hoặc banner không hợp lệ!');
  }
  this.isUpdateShop = false;
  }
  
  cancelChanges() {
    this.isUpdateShop = false;
    this.shopData = { avatarShop: null, shopName: this.shop.shopName, banner: null };
    this.avatarUrl = this.shop.avatarShop;
    this.bannerUrl = this.shop.banner;
  }
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/6306486.jpg'; // Đặt lại ảnh mặc định khi có lỗi
  }

}