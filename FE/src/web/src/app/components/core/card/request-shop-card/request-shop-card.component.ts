import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestShopDetailDto } from '../../../../interfaces/request-shop.interface';

@Component({
  selector: 'app-request-shop-card',
  templateUrl: './request-shop-card.component.html',
  styleUrl: './request-shop-card.component.scss'
})
export class RequestShopCardComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() requestDetail!: RequestShopDetailDto;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() acceptRequest: EventEmitter<void> = new EventEmitter<void>();
  @Output() rejectRequest: EventEmitter<void> = new EventEmitter<void>();
  ngOnInit(): void {
  }
  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();

  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }
  handleAccept(): void{
    this.acceptRequest.emit();
  }
  handleReject(): void{
    this.rejectRequest.emit();
  }
}
