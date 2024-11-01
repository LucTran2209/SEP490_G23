using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class OrderStatus : EntityAuditBase
    {
        public Guid OrderId { get; set; }
        public string? Message { get; set; }
        public RequestStatus Status { get; set; }
        public string? FileAttach { get; set; }
        public virtual Order Order { get; set; } = null!;
    }
}
