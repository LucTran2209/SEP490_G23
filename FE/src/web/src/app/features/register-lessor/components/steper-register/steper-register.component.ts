import { Component } from '@angular/core';

@Component({
  selector: 'app-steper-register',
  templateUrl: './steper-register.component.html',
  styleUrl: './steper-register.component.scss',
})
export class SteperRegisterComponent {
  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }

  constructor() {}
}
