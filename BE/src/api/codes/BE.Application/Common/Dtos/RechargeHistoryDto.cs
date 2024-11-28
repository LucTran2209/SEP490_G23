namespace BE.Application.Common.Dtos
{
    public class RechargeHistoryDto
    {
        public UserDto? User { get; set; }
        public decimal? BeforeBalance { get; set; }
        public decimal? AmountRecharge { get; set; }
        public RechargeStatus RechargeStatus { get; set; }
        public RechargeType RechargeType { get; set; }
        public DateTime? CreatedDate { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<RechargeHistory, RechargeHistoryDto>()
                    .ForMember(
                    dest => dest.CreatedDate,
                    opt => opt.MapFrom(src => src.CreatedDate.DateTime)
                    );
            }
        }
    }
}
