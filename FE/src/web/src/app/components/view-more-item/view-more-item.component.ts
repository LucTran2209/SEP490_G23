import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-view-more-item',
  templateUrl: './view-more-item.component.html',
  styleUrls: ['./view-more-item.component.scss'],
})
export class ViewMoreItemComponent {
  @Input() items: any[] = [];
  @Input() itemTemplate!: TemplateRef<any>;
  @Output() loadMore = new EventEmitter<boolean>();

  showMore: boolean = true;
  visibleItems: any[] = [];

  private visibleCount: number = 6;
  private incrementFactor: number = 6;

  constructor() {}

  ngOnInit() {
    this.updateVisibleItems();
  }

  toggleShowMore() {
    if (this.showMore) {
      this.visibleCount += this.incrementFactor;
    } else {
      this.visibleCount = Math.max(
        this.incrementFactor,
        this.visibleCount - this.incrementFactor
      );
    }

    this.updateVisibleItems();

    this.loadMore.emit(this.showMore);
    console.log('Visible items after toggle:', this.visibleItems);
  }

  updateVisibleItems() {
    this.visibleItems = this.items.slice(0, this.visibleCount);

    if (this.visibleItems.length >= this.items.length) {
      this.showMore = false;
    } else {
      this.showMore = true;
    }
  }

  shouldShowToggleButton(): boolean {
    return this.items.length > this.incrementFactor;
  }
}
