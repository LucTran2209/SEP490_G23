import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-navbar-header',
  templateUrl: './user-navbar-header.component.html',
  styleUrl: './user-navbar-header.component.scss'
})
export class UserNavbarHeaderComponent implements OnInit{
  userName!: string;
  @Output() avatarClick = new EventEmitter<void>(); 

  ngOnInit(): void{
    
  }

  onAvatarClick(): void {
    this.avatarClick.emit(); 
  }
}
