using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class Voucher : EntityAuditBase
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

        public RentalShop? RentalShop { get; set; }
        public virtual ICollection<UserVoucher>? UserVouchers { get; set; }
    }
}