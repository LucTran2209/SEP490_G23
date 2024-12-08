import { Component } from '@angular/core';
@Component({
  selector: 'app-base-components',
  templateUrl: './base-components.component.html',
  styleUrl: './base-components.component.scss',
})
export class BaseComponentsComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Scroll to a specific element by its ID
   * @param elementId - The ID of the target element
   */
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
