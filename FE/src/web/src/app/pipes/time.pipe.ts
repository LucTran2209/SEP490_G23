import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    if (value < 0) {
      return 'Invalid time';
    }

    const daysInMonth = 30;
    const monthsInYear = 12;

    if (value > daysInMonth * monthsInYear) {
      const years = Math.floor(value / (daysInMonth * monthsInYear));
      const remainingMonths = Math.floor((value % (daysInMonth * monthsInYear)) / daysInMonth);
      return `${years} năm${remainingMonths ? ` ${remainingMonths} tháng` : ''}`;
    } else if (value > daysInMonth) {
      const months = Math.floor(value / daysInMonth);
      const remainingDays = value % daysInMonth;
      return `${months} tháng${remainingDays ? ` ${remainingDays} ngày` : ''}`;
    } else {
      return `${value} ngày`;
    }
  }
}