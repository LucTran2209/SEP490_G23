import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostOutputDto } from '../../../../interfaces/post.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() post!: PostOutputDto;
}
