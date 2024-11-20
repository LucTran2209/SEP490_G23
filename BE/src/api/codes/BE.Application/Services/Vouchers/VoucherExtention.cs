using BE.Application.Services.Vouchers.VoucherServiceInputDto;

namespace BE.Application.Services.Vouchers
{
    public static class VoucherExtension
    {
        public static Voucher ToEntity(this CreateVoucherInputDto inputDto)
        {
            return new Voucher
            {
                ShopId = inputDto.ShopId,
                Code = inputDto.Code,
                Description = inputDto.Description,
                DiscountType = (DiscountType)inputDto.DiscountType,
                DiscountValue = inputDto.DiscountValue,
                MinimumSpend = inputDto.MinimumSpend,
                MaximumDiscount = inputDto.MaximumDiscount,
                StartDate = inputDto.StartDate,
                ExpiryDate = inputDto.ExpiryDate,
                UsageLimit = inputDto.UsageLimit,
                IsActive = inputDto.IsActive
            };
        }

        public static Voucher UpdateEntity(this UpdateVoucherInputDto inputDto, Voucher voucher)
        {
            voucher.Code = inputDto.Code;
            voucher.Description = inputDto.Description;
            voucher.DiscountType = inputDto.DiscountType;
            voucher.DiscountValue = inputDto.DiscountValue;
            voucher.MinimumSpend = inputDto.MinimumSpend;
            voucher.MaximumDiscount = inputDto.MaximumDiscount;
            voucher.StartDate = inputDto.StartDate;
            voucher.ExpiryDate = inputDto.ExpiryDate;
            voucher.UsageLimit = inputDto.UsageLimit;
            voucher.IsActive = inputDto.IsActive;

            return voucher;
        }

    }
}
