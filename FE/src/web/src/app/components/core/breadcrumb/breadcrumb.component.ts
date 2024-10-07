import { Component, Input } from '@angular/core';
import { IBreadcrumbItem } from '../../../interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() isHidden: boolean = false;
  breadcrumb: IBreadcrumbItem[] = [];
}

