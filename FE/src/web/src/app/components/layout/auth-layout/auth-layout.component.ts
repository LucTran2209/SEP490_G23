import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageMocks } from '../../../configs/image.config';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutComponent implements OnInit {
  imageUse = ImageMocks;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
