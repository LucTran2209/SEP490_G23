using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class OrderDetail : EntityAuditBase
    {
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }
        public virtual Order Order { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
    }
}
