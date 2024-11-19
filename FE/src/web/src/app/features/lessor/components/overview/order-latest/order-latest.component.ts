import { Component } from '@angular/core';

@Component({
  selector: 'app-order-latest',
  templateUrl: './order-latest.component.html',
  styleUrl: './order-latest.component.scss'
})
export class OrderLatestComponent {
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
    }
  ];
}
