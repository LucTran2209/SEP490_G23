import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IPayLoad } from '../../../../interfaces/account.interface';
import {
  ProductItemResponse,
  ProductOutputDto,
} from '../../../../interfaces/product.interface';
import { StorageService } from '../../../../services/storage.service';
import { LocalStorageKey } from '../../../../utils/constant';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductOutputDto | ProductItemResponse; // Union Type
  currentIndex: number = 0;
  @Output() editProduct = new EventEmitter<
    ProductOutputDto | ProductItemResponse
  >();
  user?: IPayLoad;

  onEditClick(): void {
    this.editProduct.emit(this.product);
  }

  get currentImage() {
    return 'images' in this.product
      ? this.product.images[this.currentIndex]
      : this.product.productImages?.[this.currentIndex].link;
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

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.handleAssginInfo();
  }
}
