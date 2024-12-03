import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { IBreadcrumbItem } from '../../../interfaces/breadcrumb.interface';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() isHidden: boolean = false;
  breadcrumbs: IBreadcrumbItem[] = [];
  isHomePage: boolean = false;
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Lắng nghe sự kiện của router để cập nhật breadcrumb
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
  
        // Kiểm tra xem trang hiện tại có phải là trang chủ không
        this.isHomePage = currentUrl === '/common/home';
        this.breadcrumbs = [];
        
        if (!this.isHomePage) {
          this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
          if (currentUrl.startsWith('/common')) {
            this.breadcrumbs = [
              { label: '', url: '/common/home' },
              ...this.breadcrumbs
            ];
          }
        } else {
          console.error('Breadcrumbs not created because it is the home page');
        }
        this.cdRef.detectChanges();
      });
  }
  
  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumbItem[] = []): IBreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;
  
    if (children.length === 0) {
      console.log('No more children, returning breadcrumbs:', breadcrumbs);
      return breadcrumbs;
    }
  
    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
  
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
  
      if (child.snapshot.data['breadcrumb']) {
        let breadcrumbLabel = child.snapshot.data['breadcrumb'];
      if (child.snapshot.params['slug']) {
        if (url.includes('product-detail')) {
          const productListSlug = decodeURIComponent(child.snapshot.params['subslug']);
          const productSlug = decodeURIComponent(child.snapshot.params['slug']);
          const subCategorId = decodeURIComponent(child.snapshot.params['suid']);
          breadcrumbs.push({
            label: `${productListSlug}`,
            url: `/common/product-list/${productListSlug}/caid/${subCategorId}`
          });
          breadcrumbLabel = `${productSlug}`; // Product name
          console.log('Breadcrumb label for product detail updated to:', breadcrumbLabel);
        } else {
          breadcrumbLabel = decodeURIComponent(child.snapshot.params['slug']);
        }
      }
  
        breadcrumbs.push({
          label: breadcrumbLabel,
          url: url
        });
      }
  
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
