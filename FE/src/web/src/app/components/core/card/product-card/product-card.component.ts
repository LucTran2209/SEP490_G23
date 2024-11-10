import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IPayLoad } from '../../../../interfaces/account.interface';
import {
  ProductImage,
  ProductItemResponse,
  ProductOutputDto,
} from '../../../../interfaces/product.interface';
import { StorageService } from '../../../../services/storage.service';
import { LocalStorageKey } from '../../../../utils/constant';
import * as RentalActions from '../../../../features/common/state/rental/rental.actions';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../../../../store/app.state';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductOutputDto | ProductItemResponse; // Union Type
  @Input() isRenter: boolean = false;
  currentIndex: number = 0;
  @Output() editProduct = new EventEmitter<
    ProductOutputDto | ProductItemResponse>();
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
  private isProductOutputDto(product: ProductOutputDto | ProductItemResponse): product is ProductOutputDto {
    return (product as ProductOutputDto).productImages !== undefined;
  }
  get currentImage() {
    if (this.isProductOutputDto(this.product)) {
      // If the product is ProductOutputDto and productImages exist
      if (this.isRenter && this.product.productImages && this.product.productImages.length > 0) {
        const currentProductImage = this.product.productImages[this.currentIndex];
        return currentProductImage?.link || null; // Return link or empty string if not found
      }
    }

    // If it's not ProductOutputDto or no productImages, fallback to string[]
    if (this.product.images && this.product.images.length > 0) {
      return this.product.images[this.currentIndex];
    }

    return null; // Default to empty string if no image is available
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
    this.router.navigate([
      '/common/product-detail',
      this.product.productName,
      '.i',
      `${this.product.id}`,
    ]);
  }

  constructor(private storageService: StorageService, private router: Router, private store: Store<FeatureAppState>) {}

  ngOnInit(): void {
    this.handleAssginInfo();
  }
}
