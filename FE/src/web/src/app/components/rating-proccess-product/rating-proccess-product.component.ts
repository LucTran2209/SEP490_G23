import { Component } from '@angular/core';

@Component({
  selector: 'app-rating-proccess-product',
  templateUrl: './rating-proccess-product.component.html',
  styleUrl: './rating-proccess-product.component.scss'
})
export class RatingProccessProductComponent {
  ratingData = [
    { stars: 5, value: 100, color: '#52c41a', count: 70 },
    { stars: 4, value: 80, color: '#fadb14', count: 1 },
    { stars: 3, value: 60, color: '#eb2f96', count: 1 },
    { stars: 2, value: 40, color: '#fa541c', count: 1 },
    { stars: 1, value: 20, color: '#f5222d', count: 1 },
  ];

  getTotalReviews(): number {
    return this.ratingData.reduce((sum, item) => sum + item.count, 0);
  }

  getAverageRating(): number {
    const totalStars = this.ratingData.reduce((sum, item) => sum + item.stars * item.count, 0);
    const totalReviews = this.getTotalReviews();
    return totalReviews > 0 ? totalStars / totalReviews : 0;
  }
}
