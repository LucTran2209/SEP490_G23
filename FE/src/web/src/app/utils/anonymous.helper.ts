import { concatMap, delay, map, Observable, of, range, takeWhile } from 'rxjs';
import { ItimeClock } from '../interfaces/anonymous.interface';

export function encodeBase64(str: string) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decodeBase64(encodedStr: string) {
  const binary = atob(encodedStr);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function customTimer(seconds: number) {
  return range(0, seconds + 1).pipe(
    concatMap((t) => of(t).pipe(delay(1000))),
    map((sec) => ({
      hours: Math.trunc(sec / (60 * 60)),
      minutes: Math.trunc(sec / 60) - Math.trunc(sec / (60 * 60)) * 60,
      seconds: sec - Math.trunc(sec / 60) * 60,
    })),
    map((time) => {
      return {
        hours: time.hours > 9 ? `${time.hours}` : `0${time.hours}`,
        minutes: time.minutes > 9 ? `${time.minutes}` : `0${time.minutes}`,
        seconds: time.seconds > 9 ? `${time.seconds}` : `0${time.seconds}`,
      };
    })
  );
}

export function countDownTimer(
  startDate: Date,
  endDate: Date
): Observable<ItimeClock> {
  const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  return range(0, seconds + 1).pipe(
    concatMap((t) => of(t).pipe(delay(1000))),
    map((sec) => seconds - sec),
    takeWhile((sec) => sec >= 0),
    map((sec) => ({
      //hour ~ divide 3600 |
      //minutes ~ divide 60 | abstract total hour in minutes
      //seconds ~ divide 60 ) multiply 60
      hours: Math.trunc(sec / (60 * 60)),
      minutes: Math.trunc(sec / 60) - Math.trunc(sec / (60 * 60)) * 60,
      seconds: sec - Math.trunc(sec / 60) * 60,
    })),
    map((time) => {
      return {
        hours: time.hours > 9 ? `${time.hours}` : `0${time.hours}`,
        minutes: time.minutes > 9 ? `${time.minutes}` : `0${time.minutes}`,
        seconds: time.seconds > 9 ? `${time.seconds}` : `0${time.seconds}`,
      };
    })
  );
}

export function getApi(wrapperSlug: object): string[] {
  return Object.entries(wrapperSlug).map(([k, v]) => v.api);
}

export const convertCurrency = (
  amount: number,
  unit?: string,
  noUnit?: boolean
) => {
  const convert = `${amount}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return `${convert} ${noUnit ? '' : unit ? unit : 'VND'}`;
};


