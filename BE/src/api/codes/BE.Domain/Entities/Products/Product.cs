using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Entities.Categories;

namespace BE.Domain.Entities.Products
{
    public class Product : EntityAuditBase, IEntityBase<Guid>
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public string NewOld { get; set; } = null!;
        public int Quantity { get; set; }
        public string Images { get; set; } = null!;
        public Guid CategoryId { get; set; }
        public virtual Category? Category { get; set; }
    }
}
