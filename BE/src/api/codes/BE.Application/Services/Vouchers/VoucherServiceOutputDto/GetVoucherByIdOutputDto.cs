namespace BE.Application.Services.Vouchers.VoucherServiceOutputDto
{
    public class GetVoucherByIdOutputDto
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public int DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public Guid ShopId { get; set; }
        public decimal MinimumSpend { get; set; }
        public decimal MaximumDiscount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int UsageLimit { get; set; }
        public bool IsActive { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                // Ánh xạ từ thực thể `Voucher` sang `GetVoucherByIdOutputDto`
                CreateMap<Voucher, GetVoucherByIdOutputDto>()
                    .ForMember(dest => dest.ShopId, opt => opt.MapFrom(src => src.ShopId))
                    .ForMember(dest => dest.Code, opt => opt.MapFrom(src => src.Code))
                    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                    .ForMember(dest => dest.DiscountType, opt => opt.MapFrom(src => src.DiscountType))
                    .ForMember(dest => dest.DiscountValue, opt => opt.MapFrom(src => src.DiscountValue))
                    .ForMember(dest => dest.MinimumSpend, opt => opt.MapFrom(src => src.MinimumSpend))
                    .ForMember(dest => dest.MaximumDiscount, opt => opt.MapFrom(src => src.MaximumDiscount))
                    .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                    .ForMember(dest => dest.ExpiryDate, opt => opt.MapFrom(src => src.ExpiryDate))
                    .ForMember(dest => dest.UsageLimit, opt => opt.MapFrom(src => src.UsageLimit))
                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.IsActive));
            }
        }
    }
}
