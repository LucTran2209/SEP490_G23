import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductOutputDto } from '../../../../interfaces/product.interface';
import { GlobalState } from '../../../../store/app.state';
import { IPayLoad } from '../../../../interfaces/account.interface';
import { StorageService } from '../../../../services/storage.service';
import { LocalStorageKey } from '../../../../utils/constant';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
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
  user?: IPayLoad;

  handleAssginInfo() {
    const userData = this.storageService.get(LocalStorageKey.currentUser);
    if (userData) {
      this.user = JSON.parse(userData) as IPayLoad;
    }
  }


  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.handleAssginInfo();
  }

  
}
