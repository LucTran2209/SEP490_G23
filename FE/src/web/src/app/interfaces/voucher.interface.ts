export interface VoucherInputDto {
    shopId: string;           // UUID của cửa hàng
    code: string;             // Mã giảm giá
    description: string;      // Mô tả chi tiết
    discountType: number;     // Loại giảm giá (0: phần trăm, 1: số tiền cố định)
    discountValue: number;    // Giá trị giảm giá
    minimumSpend: number;     // Số tiền tối thiểu để áp dụng mã
    maximumDiscount: number;  // Giảm giá tối đa (dành cho giảm theo %)
    startDate: string;        // Ngày bắt đầu áp dụng (ISO string)
    expiryDate: string;       // Ngày hết hạn (ISO string)
    usageLimit: number;       // Giới hạn số lần sử dụng
}
export interface VoucherEditInputDto {
    code: string;             // Mã giảm giá
    description: string;      // Mô tả chi tiết
    discountType: number;     // Loại giảm giá (0: phần trăm, 1: số tiền cố định)
    discountValue: number;    // Giá trị giảm giá
    minimumSpend: number;     // Số tiền tối thiểu để áp dụng mã
    maximumDiscount: number;  // Giảm giá tối đa (dành cho giảm theo %)
    startDate: string;        // Ngày bắt đầu áp dụng (ISO string)
    expiryDate: string;       // Ngày hết hạn (ISO string)
    usageLimit: number;       // Giới hạn số lần sử dụng
}

export interface VoucherOutputDto {
    id: string;
    code: string;
    description: string;
    discountValue: number;
    minimumSpend: number;
    maximumDiscount: number;
    shopId: string;
    startDate: string;
    expiryDate: string;
    isActive: boolean;
    discountType: number;
    usageLimit: number;
    isSave?: boolean;
}
export interface VoucherDetailOutputDto {
    id?: string;
    shopId: string;           // UUID của cửa hàng
    code: string;             // Mã giảm giá
    description: string;      // Mô tả chi tiết
    discountType: number;     // Loại giảm giá (0: phần trăm, 1: số tiền cố định)
    discountValue: number;    // Giá trị giảm giá
    minimumSpend: number;     // Số tiền tối thiểu để áp dụng mã
    maximumDiscount: number;  // Giảm giá tối đa (dành cho giảm theo %)
    startDate: string;        // Ngày bắt đầu áp dụng (ISO string)
    expiryDate: string;       // Ngày hết hạn (ISO string)
    usageLimit: number;       // Giới hạn số lần sử dụng
    isActive?: boolean;
    usedCount?: number;
    isSave?: boolean;
}

export interface VoucherResultService {
    statusCode: number;
    message: string;
    data: VoucherOutputDto[];
}
export interface VoucherDetailResultService {
    statusCode: number;
    message: string;
    data: VoucherDetailOutputDto[];
}