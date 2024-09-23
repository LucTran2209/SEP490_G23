import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LayoutDashboardComponent {
  user: any = {};
  isCollapsed: boolean = false;
}
