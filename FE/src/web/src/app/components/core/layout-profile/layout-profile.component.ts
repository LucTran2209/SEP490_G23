import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout-profile',
  templateUrl: './layout-profile.component.html',
  styleUrl: './layout-profile.component.scss'
})
export class LayoutProfileComponent implements OnInit {
  isAccountOpen = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.checkActiveAccountRoute();
    });
  }
  checkActiveAccountRoute() {
    const currentUrl = this.router.url;
    this.isAccountOpen = currentUrl.startsWith('/common/user/account');
  }
  ngOnInit(): void {
    
  }
}
