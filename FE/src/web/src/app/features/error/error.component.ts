import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzResultStatusType } from 'ng-zorro-antd/result';
import { Subscription } from 'rxjs';
import { ErrorStatusCode } from '../../configs/status-code.config';
import { MessageResponseService } from '../../services/message-response.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements OnInit{
  nzStatusConfig: NzResultStatusType = '404';
  errorMessage: string = '';
  private subscription: Subscription = new Subscription();
  constructor(private messageResponseService: MessageResponseService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.messageResponseService.errorCode$.subscribe((code: ErrorStatusCode) => {
        this.nzStatusConfig = this.messageResponseService.typeMessage(code);
        this.errorMessage = this.messageResponseService.getMessageSubtitle(code);
      })
    );
  }

  navigage(){
    this.route.navigateByUrl("/common/home")
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
