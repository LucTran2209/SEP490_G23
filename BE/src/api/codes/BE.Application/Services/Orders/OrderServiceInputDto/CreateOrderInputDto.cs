using AutoMapper;
using BE.Application.Common.Dtos;
using BE.Domain.Entities;

namespace BE.Application.Services.Orders.OrderServiceInputDto
{
    public class CreateOrderInputDto : OrderDto
    {
        public virtual List<OrderDetailDto>? OrderDetails { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<CreateOrderInputDto, Order>();
                CreateMap<OrderDetailDto, OrderDetail>();
            }
        }

    }
    public class OrderDetailDto
    {
        public Guid? Id { get; set; }
        public Guid? OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
