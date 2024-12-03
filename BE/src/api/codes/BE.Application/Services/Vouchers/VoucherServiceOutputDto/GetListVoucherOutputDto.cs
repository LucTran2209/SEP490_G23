using AutoMapper;
using BE.Domain.Entities;

namespace BE.Application.Services.Vouchers.VoucherServiceOutputDto
{
    public class GetListVoucherOutputDto
    {
        public Guid Id { get; set; }
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

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Voucher, GetListVoucherOutputDto>()
                    .ForMember(dest => dest.ShopId, opt => opt.MapFrom(src => src.ShopId));
            }
        }
    }
}
