import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBreadcrumbItem } from '../interfaces/breadcrumb.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }
  private breadcrumbsSubject = new BehaviorSubject<IBreadcrumbItem[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  // Cập nhật breadcrumb
  setBreadcrumbs(breadcrumbs: IBreadcrumbItem[]) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }

  // Thêm breadcrumb vào danh sách
  addBreadcrumb(breadcrumb: IBreadcrumbItem) {
    const currentBreadcrumbs = this.breadcrumbsSubject.getValue();
    this.breadcrumbsSubject.next([...currentBreadcrumbs, breadcrumb]);
  }

  // Reset breadcrumb
  resetBreadcrumbs() {
    this.breadcrumbsSubject.next([]);
  }
}
