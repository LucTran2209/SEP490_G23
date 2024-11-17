import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrl: './layout-user.component.scss'
})
export class LayoutUserComponent implements OnInit {
  isHomePage: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this.isHomePage = this.router.url === '/common/home';
    // });
  }
}
