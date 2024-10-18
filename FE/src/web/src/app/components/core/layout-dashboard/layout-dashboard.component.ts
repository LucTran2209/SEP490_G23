import { Component, ViewEncapsulation } from '@angular/core';
import { USER_ROLE } from '../../../utils/constant';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LayoutDashboardComponent {
  isSidebarCollapsed: boolean = false; 
  notificationCount: number = 5; 
  userRole: USER_ROLE = USER_ROLE.ADMIN; // Set your default role

  onToggleSidebar(collapsed: boolean): void {
    this.isSidebarCollapsed = collapsed;
    console.log('Sidebar status: ', this.isSidebarCollapsed ? 'Collapsed' : 'Expanded');
  }

  onAvatarClick(): void {
    console.log('Avatar clicked!');
  }
}
