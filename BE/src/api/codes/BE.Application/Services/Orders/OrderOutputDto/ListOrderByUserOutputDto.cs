namespace BE.Application.Services.Orders.OrderOutputDto
{
    public class ListOrderByUserOutputDto
    {
        public Guid UserId { get; set; }
        public string? Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Note { get; set; }
        public Guid OrderStatuts { get; set; }
        public Guid RentalShopId { get; set; }
        public List<DeatilOfProduct>? DetailProducts { get; set; } = new List<DeatilOfProduct>();
    }
    public class DeatilOfProduct
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public List<string> Images { get; set; } = new List<string>();
    }
}
