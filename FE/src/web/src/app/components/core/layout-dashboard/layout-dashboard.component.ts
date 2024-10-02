import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LayoutDashboardComponent {
  isSidebarCollapsed: boolean = false; 
  notificationCount: number = 5; 

  onToggleSidebar(collapsed: boolean): void {
    this.isSidebarCollapsed = collapsed;
    console.log('Sidebar status: ', this.isSidebarCollapsed ? 'Collapsed' : 'Expanded');
  }

  onAvatarClick(): void {
    console.log('Avatar clicked!');
  }
}
