using AutoMapper;
using BE.Application.Common.Dtos;
using BE.Domain.Entities;

namespace BE.Application.Services.Products.ProductServiceOutputDto
{
    public class ProductDetailOutputDto : ProductDto
    {
        public SubCategoryDto? SubCategory { get; set; }
        public RentalShopDto? RentalShop { get; set; }
        public List<string>? Images { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Product, ProductDetailOutputDto>()
                    .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.ProductImages!.Select(im => im.Link).ToList()));
            }
        }
    }
}
