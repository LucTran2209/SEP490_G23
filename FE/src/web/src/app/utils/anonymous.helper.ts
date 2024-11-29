import { concatMap, delay, map, Observable, of, range, takeWhile } from 'rxjs';
import { ItimeClock } from '../interfaces/anonymous.interface';
import { OrderStatus } from '../interfaces/order.interface';
import { DISCOUNT_TYPE, ORDER_STATUS } from './constant';

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

export function generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 *
 * @param params
 * @returns
 * @description filter field requried not null, so if it null, we'll skip that field
 */
export const cleanParams = (params: {
  [key: string]: any;
}): { [key: string]: any } => {
  const clearnParams: { [key: string]: any } = {};
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '') {
      clearnParams[key] = value;
    }
  });
  return clearnParams;
};

export const generateCodeOrder = (): string => {
  const randValue = new Uint32Array(1);
  crypto.getRandomValues(randValue);
  const ordeCode = randValue[0].toString(16).padStart(8, '0').toUpperCase();
  return ordeCode;
};

export const convertStatusOrder = (orderstatus: ORDER_STATUS) => {
  if (orderstatus === ORDER_STATUS.PENDING_APPROVAL) {
    return 'Chờ xác nhận';
  }
  if (orderstatus === ORDER_STATUS.PENDING_PAYMENT) {
    return 'Chờ thanh toán';
  }
  if (orderstatus === ORDER_STATUS.PAYMENTED) {
    return 'Đã thanh toán';
  }
  if (orderstatus === ORDER_STATUS.PENDING_DELIVERY) {
    return 'Đang giao hàng';
  }
  if (orderstatus === ORDER_STATUS.DEPOSIT_REFUND) {
    return 'Đang trả';
  }
  if (orderstatus === ORDER_STATUS.COMPLETE) {
    return 'Hoàn Thành';
  }
  if (orderstatus === ORDER_STATUS.CANCEL) {
    return 'Đã hủy';
  } else {
    return 'Đã nhận';
  }
};

export const convertButtonChangeStatusOrder = (orderstatus: ORDER_STATUS) => {
  switch (orderstatus) {
    case ORDER_STATUS.PENDING_APPROVAL:
      return 'Xác Nhận Yêu Cầu Thuê';
    case ORDER_STATUS.PAYMENTED:
      return 'Giao hàng';
    case ORDER_STATUS.REFUND:
      return 'Trả hàng';
    default:
      return 'Xác nhận hàng trả về';
  }
};

export const convertDiscountType = (discountType: DISCOUNT_TYPE): string => {
  if (discountType === DISCOUNT_TYPE.PERCENTAGE) {
    return 'Phần Trăm Theo Đơn Hàng';
  }
  if (discountType === DISCOUNT_TYPE.FIXED_AMOUNT) {
    return 'Giá Cố Định Theo Đơn Hàng';
  }
  return ''; // Trả về chuỗi rỗng nếu không tìm thấy
};

export function getErrorMessage(response: any) {
  if (response.error && response.status) {
    return response.error.message;
  } else if (response.status && response.errorList) {
    const firstError = response.errorList[0];
    return firstError
      ? `${firstError.errorMessage}`
      : 'Đã xảy ra lỗi không xác định!';
  } else {
    return 'Định dạng lỗi không hợp lệ!';
  }
}
