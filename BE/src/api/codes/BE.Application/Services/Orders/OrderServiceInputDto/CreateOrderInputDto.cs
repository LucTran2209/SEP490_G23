using AutoMapper;
using BE.Domain.Entities;

namespace BE.Application.Services.Orders.OrderServiceInputDto
{
    public class CreateOrderInputDto
    {
        public Guid UserId { get; set; }
        public string? Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal? TotalPrice { get; set; }
        public int PaymentType { get; set; }
        public string? Note { get; set; }
        public virtual List<OrderDetailDto>? OrderDetails { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<CreateOrderInputDto,Order>();
                CreateMap<OrderDetailDto, OrderDetail>();              
            }
        }

    }
    public class OrderDetailDto
    {
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }
    }
}
