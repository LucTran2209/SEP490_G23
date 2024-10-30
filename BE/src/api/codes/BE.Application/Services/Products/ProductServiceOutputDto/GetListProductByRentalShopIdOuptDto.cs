using AutoMapper;
using BE.Domain.Entities;

namespace BE.Application.Services.Products.ProductServiceOutputDto
{
    public class GetListProductByRentalShopIdOuptDto
    {
        public Guid Id { get; set; }
        public string? ProductName { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public Guid SubCategoryId { get; set; }
        public decimal RentalPrice { get; set; }
        public decimal DepositPrice { get; set; }
        public int RentalLimitDays { get; set; }
        public decimal Evaluate { get; set; }
        public virtual SubCategoryDto SubCategory { get; set; } = null!;
        public virtual List<ProductImageDto>? ProductImages { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Product, GetListProductByRentalShopIdOuptDto>();
                CreateMap<SubCategory, SubCategoryDto>();
                CreateMap<Category, CategoryDto>();
                CreateMap<ProductImage, ProductImageDto>();
            }
        }
    }

    public class SubCategoryDto
    {
        public Guid Id { get; set; }
        public string? SubCategoryName { get; set; }
        public string? Description { get; set; }
        public CategoryDto? Category { get; set; }
    }

    public class ProductImageDto
    {
        public Guid Id { get; set; }
        public Guid? ProductId { get; set; }
        public string? Link { get; set; }
    }

    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }
}