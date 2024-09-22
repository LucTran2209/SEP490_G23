import { Directive, ElementRef, HostListener } from '@angular/core';
import { REGEX } from '../utils/constant';

@Directive({
  selector: '[appNumberOnly]',
})
export class NumberOnlyDirective {

  constructor(el: ElementRef) { }


  @HostListener('input', ['$event']) onInput(event: KeyboardEvent): void {
    const inputStr = event.target as HTMLInputElement;
    const valueInput = inputStr.value;

    if(valueInput.length > 1 || !(valueInput).match(REGEX.onlyOneNumber)){
        inputStr.value = valueInput.slice(0, -1);
    }
  }





}
