import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.scss']
})
export class StatusLabelComponent implements OnInit {
  @Input() label: string = ''; // Status text
  @Input() statusType: 'success' | 'warning' | 'error' = 'success'; 

  statusClass: string = '';

  ngOnInit(): void {
    this.statusClass = this.getStatusClass(this.statusType);
  }

  // Map statusType to CSS class
  private getStatusClass(type: string): string {
    switch (type) {
      case 'success':
        return 'status-success';
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-error';
      default:
        return '';
    }
  }
}
