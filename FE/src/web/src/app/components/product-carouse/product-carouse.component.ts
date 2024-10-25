import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-carouse',
  templateUrl: './product-carouse.component.html',
  styleUrl: './product-carouse.component.scss'
})
export class ProductCarouseComponent {
  images: string[] = [
    'https://cdn.tgdd.vn/Files/2014/12/06/586947/y-nghia-cua-toc-do-quay-vat-tren-may-giat-6.jpg',
    'https://cdn.mediamart.vn/images/news/4-cach-khc-phc-khi-may-git-git-qua-lau_424ff0da.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQggMT-aEt__w_bGrrKWazeH1dkI8hS7TCE-rRJ31EuckYNE-1CT1AlQTGTsQcj-3GR-jQ&usqp=CAU',
    'https://cdn.mediamart.vn/images/news/may-git-dang-hot-dng-b-mt-din-nguyen-nhan-va-cach-khc-phc_211c5838.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO81s5Y5-4NBnLIyAYFTpRYyoZ_iqL6gd8OWSOFiqvqzP-Zega93pkhv-NhBExhc-FokA&usqp=CAU'
  ];

  selectedImage = this.images[0];

  onSelectImage(image: string) {
    this.selectedImage = image;
  }
}
