namespace BE.Application.Services.Order.OrderServiceInputDto
{
    public class CreateOrderInputDto
    {
        public Guid UserId { get; set; }
        public string? Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Note { get; set; }
        public List<DeatilProduct>? DetailProducts { get; set; } = new List<DeatilProduct>();
    }
    public class DeatilProduct
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
