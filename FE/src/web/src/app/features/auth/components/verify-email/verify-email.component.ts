import { ChangeDetectorRef, Component, input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CodeInputComponent } from 'angular-code-input';
import { MyValidators } from '../../../../utils/validators';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../../store/app.state';
import * as AuthActions from '../../state/auth.actions';
import { getCookie } from '../../../../utils/cookie.helper';
import { STRING } from '../../../../utils/constant';
import { IConfirmEmailRequest } from '../../../../interfaces/account.interface';
import { MessageResponseService } from '../../../../services/message-response.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit{
  inputEmail: FormControl<string | null> = new FormControl<string>('', [
    MyValidators.required,
    MyValidators.email,
  ]);
  codeGenerate: string | null = null;
  emailGenerate: string | null = null;
  @ViewChild('codeInput') codeInput!: CodeInputComponent;

  onCodeChanged(code: string) {
    console.log('line 24',code);
  }

  onCodeCompleted(code: string) {
    if(code !== this.codeGenerate){
      this.toastMS.handleError('Mã xác minh không trùng khớp, vui lòng thử lại!',400)
      return;
    }
    if(this.codeGenerate && this.emailGenerate && code){
      const data: IConfirmEmailRequest = {
        code: this.codeGenerate,
        email: this.emailGenerate,
        userComfirmCode: code
      }
      this.store.dispatch(AuthActions.confirmVerifyEmail({data}))
    }else{
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

  constructor(private store: Store<GlobalState>, private cdRef: ChangeDetectorRef, private toastMS: MessageResponseService) {}

  ngOnInit(): void {
    this.codeGenerate = getCookie(STRING.OTPCODE);
    this.emailGenerate = getCookie(STRING.EMAIL);
    console.log('otpcode',this.codeGenerate, this.emailGenerate);
  }
}
