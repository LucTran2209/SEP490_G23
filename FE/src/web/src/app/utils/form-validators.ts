import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchValidator(
    matchTo: string, 
    reverse?: boolean
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = control.parent.get(matchTo) as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      const matchingControl = control.parent?.get(matchTo) as AbstractControl;
      return control.parent &&
        control.parent.value &&
        control.value === matchingControl?.value
        ? null
        : { matching: true };
    };
  }