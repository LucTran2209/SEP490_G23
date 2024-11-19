import { Component, OnInit } from '@angular/core';
import { MenuPositionX, MenuPositionY } from '@angular/material/menu';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrl: './notification-popup.component.scss',
})
export class NotificationPopupComponent implements OnInit {
  notifications = notifications;
  toggleBell: boolean = false;
  
  isToggleBell(){
    this.toggleBell = !this.toggleBell
  }
  constructor() {}

  ngOnInit(): void {}
}
const xPos: MenuPositionX = 'start' as MenuPositionX;
const yPos: MenuPositionY = 'below' as MenuPositionY;
const notifications = [
  {
    title: 'Thanks for filling out W-9',
    message: 'You completed the check and you are now compliant.',
    time: 'Now',
    status: 'unread',
  },
  {
    title: 'Recent sign-in detected',
    message: 'A recent sign-in to your account from an unknown device or browser.',
    time: '1h ago',
    status: 'unread',
  },
  {
    title: 'Order Completed',
    message: 'Julian Paul marked your order as completed.',
    time: '2h ago',
    status: 'completed',
  },
  {
    title: 'Important!',
    message: 'To keep your Gigs active, check if you need to fill out W-9.',
    time: '14h ago',
    status: 'read',
  },
];
