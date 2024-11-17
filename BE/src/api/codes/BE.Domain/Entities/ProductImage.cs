using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class ProductImage : EntityAuditBase
    {
        public Guid? ProductId { get; set; }
        public string? Link { get; set; }
        public virtual Product? Product { get; set; }
    }
}
