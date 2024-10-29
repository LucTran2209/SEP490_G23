import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';


export function confirmValidator(
  passwordControl: AbstractControl
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== passwordControl.value) {
      return { confirm: true };
    }
    return null;
  };
}
