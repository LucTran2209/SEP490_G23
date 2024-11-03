import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  updateParams(filters: any) {
    const queryParams: { [key: string]: any } = {};

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        queryParams[key] = value;
      }
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge', 
    });
  }


  constructor(private router: Router, private route: ActivatedRoute) {}
}
