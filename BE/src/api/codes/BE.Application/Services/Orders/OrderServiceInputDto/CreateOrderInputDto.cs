using BE.Application.Common.Dtos;

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
}