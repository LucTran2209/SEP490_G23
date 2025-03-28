﻿using Microsoft.AspNetCore.Http;

namespace BE.Application.Services.Products.ProductServiceInputDto
{
    public class CreateProductInputDto
    {
        public string ProductName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public Guid SubCategoryId { get; set; }
        public Guid RentalShopId { get; set; }
        public decimal RentalPrice { get; set; }
        public decimal DepositPrice { get; set; }
        public int RentalLimitDays { get; set; }
        public decimal Evaluate { get; set; }
        public List<IFormFile>? Images { get; set; }
    }
}