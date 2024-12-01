import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ImageMocks } from '../../../configs/image.config';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutComponent implements OnInit {
  imageUse = ImageMocks;
  currentRoute?: string;

  get isVerifyEmailRoute(){
    return this.currentRoute === 'verify-email'
  }
  get isChangePasswordRoute(){
    return this.currentRoute === 'change-password'
  }
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url.split('/auth/')[1]
}
}
