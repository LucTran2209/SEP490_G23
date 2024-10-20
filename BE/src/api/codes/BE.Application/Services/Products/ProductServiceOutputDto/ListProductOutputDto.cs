namespace BE.Application.Services.Products.ProductServiceOutputDto
{
    public class ListProductOutputDto
    {
        public Guid Id { get; set; }
            public string ProductName { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public Guid SubCategoryId { get; set; }
        public string RentalShopName { get; set; } = string.Empty;
        public decimal RentalPrice { get; set; }
        public decimal DepositPrice { get; set; }
        public int RentalLimitDays { get; set; }
        public decimal Evaluate { get; set; }
        public string Images { get; set; } = string.Empty;
    }
}
