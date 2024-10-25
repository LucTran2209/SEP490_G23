import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductOutputDto } from '../../../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: ProductOutputDto;
  currentIndex: number = 0;
  @Output() editProduct = new EventEmitter<ProductOutputDto>();  
  onEditClick(): void {
    this.editProduct.emit();
  }
  get currentImage(): string {
    return this.product.images[this.currentIndex];
  }
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.product.images.length;
  }

  // Reset to the first image when hover ends
  resetImage(): void {
    this.currentIndex = 0; // Optionally, reset to the first image
  }
}
