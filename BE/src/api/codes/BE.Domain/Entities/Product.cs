using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class Product : EntityAuditBase
    {
        public string ProductName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid RentalShopId { get; set; }
        public string Images { get; set; }
        public decimal Price { get; set; }
        public decimal Evaluate { get; set; }  

        public virtual Category Category { get; set; } = null!;
        public virtual RentalShop RentalShop { get; set; } = null!;

    }
}
