using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class Feedback : EntityAuditBase
    {
        public Guid ProductId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public virtual Product Product { get; set; } = null!;
    }
}
