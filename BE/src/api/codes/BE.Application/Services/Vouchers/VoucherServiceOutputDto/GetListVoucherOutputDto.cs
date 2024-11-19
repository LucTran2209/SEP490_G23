using AutoMapper;
using BE.Domain.Entities;

namespace BE.Application.Services.Vouchers.VoucherServiceOutputDto
{
    public class GetListVoucherOutputDto
    {
        public Guid Id { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public decimal DiscountValue { get; set; }
        public Guid ShopId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsActive { get; set; }

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
