﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Application.Services.Products.ProductServiceOutputDto
{
    public class ListProductOutputDto
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Evaluate { get; set; }
        public string Images { get; set; } = string.Empty;
        public string RentalShopName { get; set; } = string.Empty;
    }
}
