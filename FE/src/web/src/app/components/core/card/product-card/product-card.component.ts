import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductOutputDto } from '../../../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: ProductOutputDto;
  @Output() editProduct = new EventEmitter<ProductOutputDto>();  
  onEditClick(): void {
  }
}
