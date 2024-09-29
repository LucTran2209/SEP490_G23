import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-navbar-header',
  templateUrl: './user-navbar-header.component.html',
  styleUrl: './user-navbar-header.component.scss'
})
export class UserNavbarHeaderComponent {
  @Output() avatarClick = new EventEmitter<void>(); 

  onAvatarClick(): void {
    this.avatarClick.emit(); 
  }
  handlegetClassName(e: any) {
    console.log(e.target.id, e.target.className);
    // console.log("clicked");
  }
}
