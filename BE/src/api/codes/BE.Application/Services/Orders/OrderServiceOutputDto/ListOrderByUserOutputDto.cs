using AutoMapper;
using BE.Application.Common.Dtos;
using BE.Domain.Entities;

namespace BE.Application.Services.Orders.OrderServiceOutputDto
{
    public class ListOrderByUserOutputDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string? Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal? TotalPrice { get; set; }
        public string? Note { get; set; }
        public int PaymentType { get; set; }
        public virtual User? User { get; set; }
        public virtual List<OrderDetailDto>? OrderDetails { get; set; }
        public virtual List<OrderStatusDto>? OrderStatuses { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Order, ListOrderByUserOutputDto>();
                CreateMap<Product, ProductDto>();
                CreateMap<RentalShop, RentalShopDto>();
                CreateMap<OrderDetail, OrderDetailDto>();
                CreateMap<OrderStatus, OrderStatusDto>();
            }
        }
    }
}