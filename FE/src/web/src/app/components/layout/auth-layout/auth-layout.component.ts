import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IWrappercontentImage } from '../../../configs/image_Register.config';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutComponent implements OnInit {
  imageLogo: string = 'assets/images/logo.png';
  imageWrapper!: IWrappercontentImage;
  isLoadingImage: boolean = true;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.imageWrapper = data['imageResolve'];
      this.isLoadingImage = false;
    });

    console.log(this.imageWrapper);
  }
}
