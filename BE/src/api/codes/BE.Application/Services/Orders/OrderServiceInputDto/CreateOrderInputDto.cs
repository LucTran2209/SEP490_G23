using BE.Application.Common.Dtos;
using Microsoft.AspNetCore.Http;

namespace BE.Application.Services.Orders.OrderServiceInputDto
{
    public class CreateOrderInputDto
    {
        public Guid UserId { get; set; }
        public Guid? VoucherId { get; set; }
        public string? Code { get; set; }
        public string? RecipientName { get; set; }
        public string? RecipientPhoneNumber { get; set; }
        public string? RecipientEmail { get; set; }
        public string? RecipientAddress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalRentPrice { get; set; }
        public decimal TotalDepositPrice { get; set; }
        public string? Note { get; set; }
        public MortgagePaperType MortgagePaperType { get; set; }
        public IFormFile? MortgagePaperImageFont { get; set; }
        public IFormFile? MortgagePaperImageBack { get; set; }
        public virtual List<OrderDetailDto>? OrderDetails { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<CreateOrderInputDto, Order>()
                    .ForMember(
                        dest => dest.MortgagePaperImageFont,
                        opt => opt.Ignore()
                    )
                    .ForMember(
                        dest => dest.MortgagePaperImageBack,
                        opt => opt.Ignore()
                    );

                CreateMap<OrderDetailDto, OrderDetail>();
            }
        }
    }
}