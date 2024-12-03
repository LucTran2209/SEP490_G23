import { OptionSelect } from "../configs/anonymous.config";
import { format } from 'date-fns-tz';
export function generateTimePeriods(): OptionSelect[] {
    const periods: OptionSelect[] = [];
    let count = 0;
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const label = `${padNumber(hour)}:${padNumber(minute)}`;
        periods.push({
          label,
          value: count,
        });
        count++;
      }
    }
  
    return periods;
  }
  
  function padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  export function convertToLocalISOString(date: Date): string {
    return format(date, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: 'Asia/Ho_Chi_Minh' });
  }