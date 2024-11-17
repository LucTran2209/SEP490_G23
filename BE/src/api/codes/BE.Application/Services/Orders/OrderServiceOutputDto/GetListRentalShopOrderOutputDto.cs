using BE.Application.Common.Dtos;

namespace BE.Application.Services.Orders.OrderServiceOutputDto
{
    public class GetListRentalShopOrderOutputDto : OrderDto
    {
        public UserDto? User { get; set; }
        public Voucher? Voucher { get; set; }
        public List<OrderDetailDto>? OrderDetails { get; set; }
        public List<OrderStatusDto>? OrderStatuses { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Order, GetListRentalShopOrderOutputDto>();
            }
        }
    }
}
