import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostOutputDto } from '../../../../interfaces/post.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() post!: PostOutputDto;
}
