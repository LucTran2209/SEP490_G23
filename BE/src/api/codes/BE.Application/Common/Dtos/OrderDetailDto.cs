namespace BE.Application.Common.Dtos
{
    public class OrderDetailDto
    {
        public Guid? Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }
        //public ProductDto Product { get; set; } = null!;
    }
}
