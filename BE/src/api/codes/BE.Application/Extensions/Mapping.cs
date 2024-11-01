using AutoMapper;
using BE.Application.Common.Dtos;
using BE.Domain.Entities;

namespace BE.Application.Extensions
{
    public class Mapping : Profile
    {
        public Mapping()
        { 
            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();

            CreateMap<OrderDetail, OrderDetailDto>().ReverseMap();
            CreateMap<OrderStatus, OrderStatusDto>().ReverseMap();

            CreateMap<RentalShop, RentalShopDto>();

            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<ProductImage, ProductImageDto>().ReverseMap();

            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<SubCategory, SubCategoryDto>().ReverseMap();
        }
    }
}
