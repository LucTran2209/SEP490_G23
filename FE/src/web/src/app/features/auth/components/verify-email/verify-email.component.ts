import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
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
  @ViewChild('codeInput') codeInput!: CodeInputComponent;

  onCodeChanged(code: string) {
    console.log('line 24', code);
  }

  onCodeCompleted(code: string) {
    if (code !== this.codeGenerate) {
      this.toastMS.handleError(
        'Mã xác minh không trùng khớp, vui lòng thử lại!',
        400
      );
      return;
    }
    if (this.codeGenerate && this.emailGenerate && code) {
      const data: IConfirmEmailRequest = {
        code: this.codeGenerate,
        email: this.emailGenerate,
        userComfirmCode: code,
      };
      this.isVerificationComplete = true;
      this.store.dispatch(AuthActions.confirmVerifyEmail({ data }));
    } else {
      console.log('error what');
    }
  }

  verifyEmailSubmit() {
    if (this.inputEmail.valid && this.inputEmail.value) {
      this.store.dispatch(
        AuthActions.verifyEmail({ email: this.inputEmail.value })
      );
    } else {
      console.log(this.inputEmail.value, 'email input invalid');
    }
  }

  constructor(
    private store: Store<GlobalState>,
    private cdRef: ChangeDetectorRef,
    private toastMS: MessageResponseService,
    private modal: NzModalService
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
