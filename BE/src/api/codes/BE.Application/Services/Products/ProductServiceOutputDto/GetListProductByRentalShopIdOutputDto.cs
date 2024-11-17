using BE.Application.Common.Dtos;

namespace BE.Application.Services.Products.ProductServiceOutputDto
{
    public class GetListProductByRentalShopIdOutputDto : ProductDto
    {
        public SubCategoryDto? SubCategory { get; set; }
        public List<string>? Images { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Product, GetListProductByRentalShopIdOutputDto>()
                    .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.ProductImages!.Select(im => im.Link).ToList()));
            }
        }
    }
}