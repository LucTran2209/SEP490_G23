using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class OrderStatus : EntityAuditBase
    {
        public Guid OrderId { get; set; }  // Liên kết đến đơn hàng
        public string? Message { get; set; }
        public RequestStatus Status { get; set; }  // Enum lưu trạng thái đơn hàng
        public string? FileAttach { get; set; }
        public virtual Order Order { get; set; } = null!;
    }
}
