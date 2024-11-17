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
        // console.log('Current URL:', currentUrl);
        // console.log('Is Home Page:', this.isHomePage);
  
        // Khởi tạo lại mảng breadcrumbs
        this.breadcrumbs = [];
        // console.log('Breadcrumbs reset:', this.breadcrumbs);
  
        // Tạo breadcrumbs nếu không phải trang chủ
        
        if (!this.isHomePage) {
          this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
          // this.breadcrumbs = [{ label: '', url: '/common/home' }, ...this.breadcrumbs];
          if (currentUrl.startsWith('/common')) {
            // Thêm "Trang Chủ" hoặc breadcrumb mặc định vào đầu
            this.breadcrumbs = [
              { label: '', url: '/common/home' },
              ...this.breadcrumbs
            ];
          }
          // console.log('Breadcrumbs created:', this.breadcrumbs);
        } else {
          console.log('Breadcrumbs not created because it is the home page');
        }
        this.cdRef.detectChanges();
      });
  }
  
  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumbItem[] = []): IBreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;
    // console.log('Children routes:', children);
  
    if (children.length === 0) {
      console.log('No more children, returning breadcrumbs:', breadcrumbs);
      return breadcrumbs;
    }
  
    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      // console.log('Current child route URL segment:', routeURL);
  
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
  
      if (child.snapshot.data['breadcrumb']) {
        let breadcrumbLabel = child.snapshot.data['breadcrumb'];
        // console.log('Breadcrumb data found:', breadcrumbLabel);

              // Handling for the product-detail route
      if (child.snapshot.params['slug']) {
        // if (url.includes('product-detail')) {
        //   // When on the product-detail page, we want to include the parent (product-list) breadcrumb as well
        //   const productListSlug = child.snapshot.params['slug']; // Get the product list slug (from the parent route)
        //   const productSlug = decodeURIComponent(child.snapshot.params['id']); // Get product slug (from the product-detail route)

        //   // Add the breadcrumb for the product-list route first (parent breadcrumb)
        //   breadcrumbs.push({
        //     label: `Danh Sách Sản Phẩm ${productListSlug}`,
        //     url: `/product-list/${productListSlug}`
        //   });

        //   // Now add the breadcrumb for the product-detail route
        //   breadcrumbLabel = `${productSlug}`; // Product name
        //   console.log('Breadcrumb label for product detail updated to:', breadcrumbLabel);
        // } else {
          // For other routes, just decode the slug normally
          breadcrumbLabel = decodeURIComponent(child.snapshot.params['slug']);
          // console.log('Slug found, breadcrumb label updated to:', breadcrumbLabel);
        // }
      }
  
        // Kiểm tra nếu có tham số slug, thay thế breadcrumb label bằng slug (tên sản phẩm)
        // if (child.snapshot.params['slug']) {
        //   breadcrumbLabel = decodeURIComponent(child.snapshot.params['slug']);
        //   console.log('Slug found, breadcrumb label updated to:', breadcrumbLabel);
        // }
  
        breadcrumbs.push({
          label: breadcrumbLabel,
          url: url
        });
        // console.log('Breadcrumb added:', { label: breadcrumbLabel, url: url });
      }
  
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  
    // console.log('Returning final breadcrumbs:', breadcrumbs);
    return breadcrumbs;
  }
}
