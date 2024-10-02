import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrl: './layout-user.component.scss'
})
export class LayoutUserComponent {
  isCollapsed: boolean = false;
  user: any = [];
}
