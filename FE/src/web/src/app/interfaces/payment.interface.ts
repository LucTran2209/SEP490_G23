export interface rechargeMoney {
    amount: string;
}
export interface rechargeResultService {
    statusCode: number;
    message: string;
    data: string;
}

// Định nghĩa cho thông tin người dùng
export interface User {
    fullName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: boolean;
    dateOfBirth: string; // ISO string format
  }
  
  // Định nghĩa cho thông tin nạp tiền
  export interface RechargeHistoryData {
    user: User;
    beforeBalance: number; // Số dư trước khi nạp
    amountRecharge: number; // Số tiền nạp
    rechargeStatus: number; // Trạng thái nạp (0: chờ xử lý, 1: thất bại, 2: thành công)
    rechargeType: number; // Loại nạp (giả định: 0: nạp tiền thông thường, ...)
    createdDate: string; // Ngày tạo (ISO string format)
  }
  
  // Định nghĩa cho cấu trúc JSON trả về từ server
  export interface RechargeHistoryResponse {
    statusCode: number;
    message: string;
    data: RechargeHistoryData[];
  }