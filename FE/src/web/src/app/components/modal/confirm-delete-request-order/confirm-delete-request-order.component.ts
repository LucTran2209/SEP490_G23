import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { MessageResponseService } from '../../../services/message-response.service';
import { FeatureAppState } from '../../../store/app.state';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-confirm-delete-request-order',
  templateUrl: './confirm-delete-request-order.component.html',
  styleUrl: './confirm-delete-request-order.component.scss'
})
export class ConfirmDeleteRequestOrderComponent implements OnInit, OnDestroy{
  noteMessage: FormControl<string | null> = new FormControl<string | null>('');
  @Output() noteReasonCancel = new EventEmitter<any>();

  confirm(): void {
    this.noteReasonCancel.emit(this.noteMessage.value);
    this.modalRef.triggerOk();
    this.noteMessage.reset();
  }

  constructor(
    private modalRef: NzModalRef,
  ) {}

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    
  }

}
