import { OptionSelect } from '../configs/anonymous.config';
import { HttpStatusCode } from '../configs/status-code.config';

export enum STRING {
  ID = 'id',
  ASC = 'ascend',
  DESC = 'descend',
  TIME = 'time',
  DATE = 'date',
  NUMBER = 'number',
  STRING = 'string',
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  PREFIX = 'prefix',
  SUFFIX = 'suffix',
  TOKEN = 'token',
  FAILED = 'failed',
  OTPCODE = 'otp_code',
  EMAIL = 'email',
}

export const ErrorMessages: Record<HttpStatusCode, string> = {
  [HttpStatusCode.UNKNOWN_ERROR]:
    'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.',
  [HttpStatusCode.BAD_REQUEST]:
    'Yêu cầu không hợp lệ. Vui lòng kiểm tra và thử lại.',
  [HttpStatusCode.UNAUTHORIZED]:
    'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.',
  [HttpStatusCode.FORBIDDEN]: 'Bạn không có quyền truy cập vào tài nguyên này.',
  [HttpStatusCode.NOT_FOUND]: 'Không tìm thấy tài nguyên yêu cầu.',
  [HttpStatusCode.CONFLICT]: 'Xung đột dữ liệu. Vui lòng kiểm tra thông tin.',
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'Lỗi hệ thống. Vui lòng thử lại sau.',
  [HttpStatusCode.BAD_GATEWAY]: 'Lỗi kết nối. Vui lòng thử lại sau.',
  [HttpStatusCode.SERVICE_UNAVAILABLE]:
    'Hệ thống đang bảo trì. Vui lòng quay lại sau.',
  [HttpStatusCode.GATEWAY_TIMEOUT]:
    'Kết nối đến máy chủ bị gián đoạn. Vui lòng thử lại.',
  [HttpStatusCode.OK]: '',
  [HttpStatusCode.CREATED]: 'Tạo mới thành công!',
  [HttpStatusCode.NO_CONTENT]: 'Không có dữ liệu để hiển thị.',
};

export const BASE_AVATAR_IMG =
  'https://firebasestorage.googleapis.com/v0/b/sm-ngrx-6e4cd.appspot.com/o/ezgif-1-c7078777f5-removebg-preview%201%20(1).png?alt=media&token=aa4b5717-5708-4bc9-8ffc-24d992c47b48';

export enum USER_ROLE {
  ADMIN = 'Admin',
  LESSOR = 'Lessor',
  RENTER = 'Renter',
  MODERATOR = 'Moderator',
}

export const PERMISSION_ALL = [];

export const LocalStorageKey = {
  currentUser: 'current_user',
  breadCrumb: 'bread_crumb',
  prevBreadcrumb: 'prev_bread_crumb',
  orderProcess: 'order_process',
  rangeDate: 'rangeDate'
};
export const Sessionkey = {
  orderProcess: 'order_process',
};

export const REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^.{8,30}$/,
  phoneNumber: /^(03|05|07|08|09|01[2|6|8|9])\d{8}$/,
  onlyOneNumber: /^\d{1}$/,
};

export const FormatDate = {
  DDMMYYYY: 'dd/MM/YYYY',
};

export const ORDER_STATUS_MAX = 7;
export enum ORDER_STATUS {
  PENDING_APPROVAL = 0,
  PENDING_PAYMENT = 1,
  PAYMENTED = 2,
  PENDING_DELIVERY = 3,
  REFUND = 4,
  DEPOSIT_REFUND = 5,
  COMPLETE = 6,
  CANCEL = 7,
}
export enum DISCOUNT_TYPE {
  PERCENTAGE = 0,
  FIXED_AMOUNT = 1,
}

export const chooseFollowDate: OptionSelect[] = [
  {
    label: 'Theo tuần',
    value: 'week',
  },
  {
    label: 'Theo tháng',
    value: 'month',
  },
];
