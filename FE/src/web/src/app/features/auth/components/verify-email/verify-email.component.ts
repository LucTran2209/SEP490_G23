import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CodeInputComponent } from 'angular-code-input';
import { IConfirmEmailRequest } from '../../../../interfaces/account.interface';
import { MessageResponseService } from '../../../../services/message-response.service';
import { GlobalState } from '../../../../store/app.state';
import { STRING } from '../../../../utils/constant';
import { getCookie } from '../../../../utils/cookie.helper';
import { MyValidators } from '../../../../utils/validators';
import * as AuthActions from '../../state/auth.actions';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit {
  inputEmail: FormControl<string | null> = new FormControl<string>('', [
    MyValidators.required,
    MyValidators.email,
  ]);
  isVerificationComplete: boolean = false;
  codeGenerate: string | null = null;
  emailGenerate: string | null = null;
  @Output() onResendCode = new EventEmitter();
  @Output() onChangeEmailStepFirst = new EventEmitter();
  @Output() onVerifyOtpCode = new EventEmitter<string>();
  @ViewChild('codeInput') codeInput!: CodeInputComponent;

  onCodeChanged(code: string) {
    console.log('line 24', code);
  }

  onCodeCompleted(code: string) {
    this.onVerifyOtpCode.emit(code);
    this.isVerificationComplete = true;
  }

  reSendCode() {
    this.onResendCode.emit();
  }

  changeEmail() {
    this.store.dispatch(AuthActions.reset_state());
    this.onChangeEmailStepFirst.emit();
  }

  constructor(
    private store: Store<GlobalState>,
  ) {}

  ngOnInit(): void {
    this.codeGenerate = getCookie(STRING.OTPCODE);
    this.emailGenerate = getCookie(STRING.EMAIL);
    console.log('otpcode', this.codeGenerate, this.emailGenerate);
  }

  canDeactivate(): boolean {
    return this.isVerificationComplete;
  }
}
