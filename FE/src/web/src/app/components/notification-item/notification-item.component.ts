import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.scss'
})
export class NotificationItemComponent {
 @Input() data: any = dataMock;
}

const dataMock = {
  text: 'New inspection assigned QW0001 - Pepsi Asia',
  time: '19/11/2024',
  isRead: false
}
