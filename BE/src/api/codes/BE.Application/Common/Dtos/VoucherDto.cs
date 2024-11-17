using BE.Domain.Abstractions.Enums;
using BE.Domain.Entities;

namespace BE.Application.Common.Dtos
{
    public class VoucherDto
    {
        public Guid ShopId { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public DiscountType DiscountType { get; set; } 
        public decimal DiscountValue { get; set; }
        public decimal? MinimumSpend { get; set; }
        public decimal? MaximumDiscount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int? UsageLimit { get; set; }
        public int UsedCount { get; set; } = 0;
        public bool IsActive { get; set; } = true;

        //public RentalShop? RentalShop { get; set; }
        //public virtual ICollection<UserVoucher>? UserVouchers { get; set; }

    }
}
