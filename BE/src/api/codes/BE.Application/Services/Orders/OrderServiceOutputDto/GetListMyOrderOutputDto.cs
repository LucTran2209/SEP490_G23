using BE.Application.Common.Dtos;

namespace BE.Application.Services.Orders.OrderServiceOutputDto
{
    public class GetListMyOrderOutputDto : OrderDto
    {
        public Guid RentalShopId { get; set; }
        public string? RentalShopName { get; set; }
        public VoucherDto? Voucher { get; set; }
        public List<OrderDetailDto>? OrderDetails { get; set; }
        public List<OrderStatusDto>? OrderStatuses { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Order, GetListMyOrderOutputDto>()
                    .ForMember(
                        dest => dest.RentalShopId,
                        opt => opt.MapFrom(src => src.OrderDetails!.FirstOrDefault()!.Product.RentalShop.Id)
                    )
                    .ForMember(
                        dest => dest.RentalShopName,
                        opt => opt.MapFrom(src => src.OrderDetails!.FirstOrDefault()!.Product.RentalShop.ShopName)
                    );
            }
        }
    }
}
