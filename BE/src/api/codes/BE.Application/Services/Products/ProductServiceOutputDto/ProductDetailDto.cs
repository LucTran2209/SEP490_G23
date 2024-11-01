using AutoMapper;
using BE.Application.Common.Dtos;
using BE.Domain.Entities;

namespace BE.Application.Services.Products.ProductServiceOutputDto
{
    public class ProductDetailOutputDto : ProductDto
    {
        public SubCategoryDto? SubCategory { get; set; }
        public RentalShopDto? RentalShop { get; set; }
        public List<ProductImageDto>? ProductImages { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Product, ProductDetailOutputDto>();
            }
        }
    }
}
