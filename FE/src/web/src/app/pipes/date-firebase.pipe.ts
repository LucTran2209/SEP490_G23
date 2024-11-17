import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'dateFirebase',
})
export class DateFirebasePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: Timestamp | undefined): unknown {
    if (value instanceof Timestamp) { 
      return this.datePipe.transform(value.toMillis(), 'short') ?? '';
    }
    return '';
  }
}
