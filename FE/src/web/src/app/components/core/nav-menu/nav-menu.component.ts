import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  @Output() getClassName: EventEmitter<void> = new EventEmitter<void>();
  handlegetClassName() {
    // console.log(e.target.id, e.target.className);
    this.getClassName.emit();
  }
}
