import { Component } from '@angular/core';

@Component({
  selector: 'app-notifcation-latest',
  templateUrl: './notifcation-latest.component.html',
  styleUrl: './notifcation-latest.component.scss'
})
export class NotifcationLatestComponent {
  loading = false;
  data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    },
    {
      title: 'Ant Design Title 5'
    },
  ];
}
