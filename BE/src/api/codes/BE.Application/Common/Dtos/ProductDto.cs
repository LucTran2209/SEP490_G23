using AutoMapper;
using BE.Domain.Entities;

namespace BE.Application.Common.Dtos
{
    public class ProductDto
    {
        public Guid? Id { get; set; }
        public string? ProductName { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public decimal RentalPrice { get; set; }
        public decimal DepositPrice { get; set; }
        public int RentalLimitDays { get; set; }
        public decimal Evaluate { get; set; }
        //public SubCategoryDto? SubCategory { get; set; }
        //public RentalShopDto? RentalShop { get; set; }
        //public List<ProductImageDto>? ProductImages { get; set; }
    }
}