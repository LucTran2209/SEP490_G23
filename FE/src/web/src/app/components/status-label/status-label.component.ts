import { Component, Input, OnInit } from '@angular/core';
import { ORDER_STATUS } from '../../utils/constant';

@Component({
  selector: 'app-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.scss'],
})
export class StatusLabelComponent implements OnInit {
  @Input() label: string = ''; // Status text
  @Input() statusType: 'success' | 'warning' | 'error' | ORDER_STATUS =
    'success';

  statusClass: string = '';

  ngOnInit(): void {
    this.statusClass = this.getStatusClass(this.statusType);
  }

  // Map statusType to CSS class
  private getStatusClass(type: string | ORDER_STATUS): string {
    switch (type) {
      case 'success':
      case ORDER_STATUS.DEPOSIT_REFUND:
        return 'status-success';
      case 'warning':
      case ORDER_STATUS.PENDING_PAYMENT:
        return 'status-warning';
      case 'error':
        return 'status-error';
      case ORDER_STATUS.PENDING_APPROVAL:
        return 'status-pending_approval';
      case ORDER_STATUS.PENDING_DELIVERY:
        return 'status-pending_delivery';
      case ORDER_STATUS.RECEIVED:
        return 'status-received';
      case ORDER_STATUS.REFUND:
        return 'status-refund';
      default:
        return '';
    }
  }
}
