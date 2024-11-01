using AutoMapper;
using BE.Application.Common.Dtos;
using BE.Domain.Entities;

namespace BE.Application.Services.Products.ProductServiceOutputDto
{
    public class GetListProductOutputDto : ProductDto
    {
        public SubCategoryDto? SubCategory { get; set; }
        public RentalShopDto? RentalShop { get; set; }
        public List<string>? Images { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Product, GetListProductOutputDto>();
            }
        }
    }
}