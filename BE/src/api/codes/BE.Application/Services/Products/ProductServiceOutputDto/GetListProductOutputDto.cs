using BE.Application.Common.Dtos;

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