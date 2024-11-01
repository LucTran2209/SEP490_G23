using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class Order : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public string? Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal? TotalPrice { get; set; }
        public string? Note { get; set; }
        public int PaymentType {  get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<OrderDetail>? OrderDetails { get; set; }
        public virtual ICollection<OrderStatus>? OrderStatuses { get; set; }
    }
}
