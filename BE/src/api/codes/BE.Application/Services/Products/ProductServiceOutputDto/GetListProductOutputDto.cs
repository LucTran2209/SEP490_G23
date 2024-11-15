using BE.Application.Common.Dtos;
using BE.Application.Models;

namespace BE.Application.Services.Products.ProductServiceOutputDto
{
    public class GetListProductOutputDto
    {
        public List<RentalShopDto>? RentalShops { get; set; }
        public PagedResultModel<ProductDetailDto>? Products { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Product, ProductDetailDto>();
            }
        }
    }

    public class ProductDetailDto : ProductDto
    {
        public SubCategoryDto? SubCategory { get; set; }
        public RentalShopDto? RentalShop { get; set; }

    }
}