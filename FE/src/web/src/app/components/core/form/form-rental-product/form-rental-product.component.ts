import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

 interface IProductShortSearch {
  id: string | number;
  productName: string;
  rentalPrice: number;
  depositPrice: number;
  rentalLimitDays: number;
  images: string;
}

@Component({
  selector: 'app-form-rental-product',
  templateUrl: './form-rental-product.component.html',
  styleUrl: './form-rental-product.component.scss',
})
export class FormRentalProductComponent implements OnInit {
  isConfirmLoading = false;
  isVisible = false;
  currentRoute?: string;
  inputValue?: string;
  options: Array<IProductShortSearch> = [];
  tags: IProductShortSearch[] = [];

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  handleCloseTag(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  onSearchProductShort(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.options = new Array(this.getRandomInt(5,15))
    .join('.')
    .split('.')
    .map((_item, idx) => ({
      id: idx + 1,
      productName: `${value}${idx}`,
     depositPrice: 20000,
     images: "https://cdn.tgdd.vn/Files/2014/12/06/586947/y-nghia-cua-toc-do-quay-vat-tren-may-giat-6.jpg",
     rentalLimitDays: 12,
     rentalPrice: 30000,

    }))
  }

  onSelectProduct(e: IProductShortSearch){
    this.tags.push(e);
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  showModal(): void {
    this.isVisible = true;
  }
  
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  
  handlePickerTimer() {}
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('>>> line 36', this.route.snapshot.url[0].path);
    this.currentRoute = this.route.snapshot.url[0].path;
  }
}
