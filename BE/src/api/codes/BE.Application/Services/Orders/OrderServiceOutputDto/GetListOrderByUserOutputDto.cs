using BE.Application.Common.Dtos;

namespace BE.Application.Services.Orders.OrderServiceOutputDto
{
    public class GetListOrderByUserOutputDto : OrderDetailDto
    {
        public List<OrderStatusDto>? OrderStatuses { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Order, GetListOrderByUserOutputDto>();
            }
        }
    }
}