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
  export function ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateOfBirth = control.value;
      if (!dateOfBirth) {
        return null;
      }
  
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const isUnder18 = age < 18 || (age === 18 && monthDifference < 0);
      
      return isUnder18 ? { under18: true } : null;
    };
  }