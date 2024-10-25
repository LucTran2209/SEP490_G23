import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostOutputDto } from '../../../../interfaces/post.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post!: PostOutputDto;

  createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  get slug() {
    return this.createSlug('Máy giặt XQB30MJ102W');
  }
  get productId() {
    return 1010010;
  }
}
