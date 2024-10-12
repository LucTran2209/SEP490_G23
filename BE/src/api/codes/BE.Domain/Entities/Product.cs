using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class Product : EntityAuditBase
    {
        public string ProductName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Brand { get; set; }
        public bool NewOld { get; set; }
        public string? Code { get; set; }
        public int Quantity { get; set; }
        public Guid CategoryId { get; set; }

        public virtual ICollection<ProductImage>? Images { get; set; }
        public virtual Category Category { get; set; } = null!;
    }
}