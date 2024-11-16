import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-rental-list',
  templateUrl: './shop-rental-list.component.html',
  styleUrl: './shop-rental-list.component.scss'
})
export class ShopRentalListComponent implements OnInit {
  search!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to the query parameters and access the 'search' parameter
    this.route.queryParamMap.subscribe(params => {
      this.search = params.get('search') || 'default'; // Use 'default' if no 'search' parameter

      // Now you can use the search term (e.g., to filter products, load related items, etc.)
    });
  }
}
