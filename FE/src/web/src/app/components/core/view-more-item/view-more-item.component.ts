import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface CheckboxItem {
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-view-more-item',
  templateUrl: './view-more-item.component.html',
  styleUrl: './view-more-item.component.scss',
})
export class ViewMoreItemComponent {
  @Input() items: CheckboxItem[] = [];
  @Output() selectionChange = new EventEmitter<CheckboxItem>();

  isExpanded = false;
  showMoreButton = true;

  visibleItems: CheckboxItem[] = [];
  hiddenItems: CheckboxItem[] = [];

  ngOnInit() {
    this.visibleItems = this.items.slice(0, 4);
    this.hiddenItems = this.items.slice(4);

    this.showMoreButton = this.items.length > 4;
  }

  onSelectionChange(item: CheckboxItem) {
    this.selectionChange.emit(item);
  }

  toggleMore(): void {
    this.isExpanded = !this.isExpanded;
  }
}
