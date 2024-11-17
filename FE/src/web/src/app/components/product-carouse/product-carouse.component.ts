import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-product-carouse',
  templateUrl: './product-carouse.component.html',
  styleUrl: './product-carouse.component.scss',
})
export class ProductCarouseComponent implements OnInit, OnChanges {
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    infinite: false,
  };
  @Input() images: string[] = [];

  selectedImage?: string;

  onSelectImage(image: string) {
    this.selectedImage = image;
  }

  private hasImagesChanged(changes: SimpleChanges): boolean {
    return changes['images']?.currentValue?.length > 0;
  }

  private updateSelectedImage(): void {
    this.selectedImage = this.images[0];
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.hasImagesChanged(changes)) {
      this.updateSelectedImage();
    }
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
}

/**
 * [
    'https://cdn.tgdd.vn/Files/2014/12/06/586947/y-nghia-cua-toc-do-quay-vat-tren-may-giat-6.jpg',
    'https://cdn.mediamart.vn/images/news/4-cach-khc-phc-khi-may-git-git-qua-lau_424ff0da.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQggMT-aEt__w_bGrrKWazeH1dkI8hS7TCE-rRJ31EuckYNE-1CT1AlQTGTsQcj-3GR-jQ&usqp=CAU',
    'https://cdn.mediamart.vn/images/news/may-git-dang-hot-dng-b-mt-din-nguyen-nhan-va-cach-khc-phc_211c5838.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO81s5Y5-4NBnLIyAYFTpRYyoZ_iqL6gd8OWSOFiqvqzP-Zega93pkhv-NhBExhc-FokA&usqp=CAU',
  'https://cdn.mediamart.vn/images/news/may-git-dang-hot-dng-b-mt-din-nguyen-nhan-va-cach-khc-phc_211c5838.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO81s5Y5-4NBnLIyAYFTpRYyoZ_iqL6gd8OWSOFiqvqzP-Zega93pkhv-NhBExhc-FokA&usqp=CAU',
"https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
 */
