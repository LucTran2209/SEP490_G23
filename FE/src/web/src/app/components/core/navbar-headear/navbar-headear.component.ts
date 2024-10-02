import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-headear',
  templateUrl: './navbar-headear.component.html',
  styleUrl: './navbar-headear.component.scss'
})
export class NavbarHeadearComponent {
  @Input() isCollapsed: boolean = false; 
  @Input() notificationCount: number = 0; 
  
  @Output() toggleSidebar = new EventEmitter<boolean>(); 
  @Output() avatarClick = new EventEmitter<void>(); 

  handleToggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed; 
    this.toggleSidebar.emit(this.isCollapsed); 
  }

  onAvatarClick(): void {
    this.avatarClick.emit(); 
  }
}
