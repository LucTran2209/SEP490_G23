using AutoMapper;
using BE.Application.Common.Dtos;
using BE.Domain.Entities;

namespace BE.Application.Services.Products.ProductServiceOutputDto
{
    public class GetListProductByRentalShopIdOutputDto : ProductDto
    {
        public SubCategoryDto? SubCategory { get; set; }
        public List<ProductImageDto>? ProductImages { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Product, GetListProductByRentalShopIdOutputDto>();
            }
        }
    }
}
