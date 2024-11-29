import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable, of } from 'rxjs';
import * as RentalActions from '../../../../features/common/state/rental/rental.actions';
import { IPayLoad } from '../../../../interfaces/account.interface';
import {
  ProductOutputDto
} from '../../../../interfaces/product.interface';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { LocalStorageKey } from '../../../../utils/constant';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit, AfterContentInit {
  @Input() product!: ProductOutputDto; // Union Type
  @Input() isRenter: boolean = false;
  paramURL$?: Observable<string>;
  currentIndex: number = 0;
  isLessor: boolean = false;
  @Output() editProduct = new EventEmitter<
    ProductOutputDto>();
  user?: IPayLoad;

  onEditClick(): void {
    this.editProduct.emit(this.product);
  }

  /**
   * 
   * @param id 
   * @description add more product in order
   */
  onAddMoreClick(){
   this.store.dispatch(
    RentalActions.setInit({
      pid: this.product.id,
      depositPrice: this.product.depositPrice,
      productName: this.product.productName,
      quantityAvailable: this.product.quantity,
      rentalPrice: this.product.rentalPrice,
      images: this.product.images as string[]
    })
   )
  }
  get currentImage() {
      if (this.isRenter && this.product.productImages && this.product.productImages.length > 0) {
        const currentProductImage = this.product.productImages[this.currentIndex];
        return currentProductImage?.link || null; 
      }

    // If it's not ProductOutputDto or no productImages, fallback to string[]
    if (this.product.images && this.product.images.length > 0) {
      return this.product.images[this.currentIndex];
    }

    return null; // Default to empty string if no image is available
  }
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/6306486.jpg'; // Đặt lại ảnh mặc định khi có lỗi
  }
  nextImage(): void {
    if ('images' in this.product && this.product.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.product.images.length;
    }
  }

  resetImage(): void {
    this.currentIndex = 0;
  }

  handleAssginInfo() {
    const userData = this.storageService.get(LocalStorageKey.currentUser);
    if (userData) {
      this.user = JSON.parse(userData) as IPayLoad;
    }
  }

  onNavigate() {
    if(!this.isLessor){
      this.router.navigate([
        '/common/product-detail',
        this.product.productName,
        '.i',
        `${this.product.id}`,
        '.suid',
        `${this.product.subCategory.id}`,
        `${this.product.subCategory.subCategoryName}`
      ]);
    }
  }

  getParam(){
    this.activateRoute.url.pipe(
      first(),
      map((res) => {
        this.paramURL$ = of(res[0].path);
      })
    ).subscribe();
  }

  constructor(private storageService: StorageService, private router: Router,private activateRoute: ActivatedRoute, private store: Store<FeatureAppState>) {}

  ngAfterContentInit(): void {
    this.getParam();
  }
  ngOnInit(): void {
    this.handleAssginInfo();
    const currentRoute = this.router.url;
    if (currentRoute.includes('/lessor/shop')){
      this.isLessor = true;
    }
  }
}
