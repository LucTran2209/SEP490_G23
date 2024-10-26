namespace BE.Application.Services.Orders.OrderOutputDto
{
    public class ListOrderByUserOutputDto
    {
        public Guid OrderId { get; set; }
        public Guid UserId { get; set; }
        public string? Address { get; set; }
        public int NumberofRentalDays { get; set; }
        public string? Note { get; set; }
        public double? TotalPrice { get; set; }
        public string? Status { get; set; }
        public string RentalShopName { get; set; }
        public List<DeatilOfProduct>? DetailProducts { get; set; } = new List<DeatilOfProduct>();
    }
    public class DeatilOfProduct
    {
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal DepositPrice { get; set; }
        public List<string> Images { get; set; } = new List<string>();
    }
}
