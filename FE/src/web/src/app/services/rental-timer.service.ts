import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentalTimerService {
  private currentDate = new Date();

  private rangePickerTimeSubject = new BehaviorSubject<Date[]>([
    this.setTimeForDate(this.getTomorrowDate(), '00:00'),
    this.setTimeForDate(this.getTomorrowDate(), '23:30'),
  ]);

  private timeStartSubject = new BehaviorSubject<any>({
    label: '00:00',
    value: 0,
  });
  private timeEndSubject = new BehaviorSubject<any>({
    label: '23:30',
    value: 47,
  });
  private rentalDaysSubject = new BehaviorSubject<number>(0);

  rangePickerTime$ = this.rangePickerTimeSubject.asObservable();
  timeStart$ = this.timeStartSubject.asObservable();
  timeEnd$ = this.timeEndSubject.asObservable();
  rentalDays$ = this.rentalDaysSubject.asObservable();


  private calculateRentalDays(dates: Date[]) {
    if (dates.length === 2 && dates[0] && dates[1]) {
      const rentalDays = this.convertRentalDays(dates);
      this.rentalDaysSubject.next(rentalDays);
    } else {
      this.rentalDaysSubject.next(0);
    }
  }
  
  setRangePickerTime(dates: Date[]) {
    this.rangePickerTimeSubject.next(dates);
    this.calculateRentalDays(dates);
  }

  setTimeStart(time: any) {
    this.timeStartSubject.next(time);
  }

  setTimeEnd(time: any) {
    this.timeEndSubject.next(time);
  }

  setTimeForDate(date: Date, time: string): Date {
    console.log('date,time',typeof date,time);
    const [hour, minute] = time.split(':').map(Number);
    const newDate = new Date(date.getTime());
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  }

  getTomorrowDate(): Date {
    const tomorrow = new Date(this.currentDate);
    return this.addDaysToDate(tomorrow, 1);
  }

  addDaysToDate(baseDate: Date, days: number): Date {
    const newDate = new Date(baseDate);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }



  convertRentalDays(dates: Date[]): number {
    const diffTime = Math.abs(dates[1].getTime() - dates[0].getTime());
    const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return rentalDays;
  }

  clearState() {
    this.rangePickerTimeSubject.next([
      this.setTimeForDate(this.getTomorrowDate(), '00:00'),
      this.setTimeForDate(this.getTomorrowDate(), '23:30'),
    ]);
    this.timeStartSubject.next({ label: '00:00', value: '00:00' });
    this.timeEndSubject.next({ label: '23:30', value: '23:30' });
    this.rentalDaysSubject.next(0);
  }
}
