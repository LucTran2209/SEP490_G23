using BE.Domain.Entities;

namespace BE.Application.Common.Dtos
{
    public class OrderDto
    {
        public Guid? Id { get; set; }
        public Guid UserId { get; set; }
        public string? Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal? TotalPrice { get; set; }
        public string? Note { get; set; }
        public int PaymentType { get; set; }
        //public virtual List<OrderDetailDto>? OrderDetails { get; set; }
        //public virtual List<OrderStatusDto>? OrderStatuses { get; set; }
    }
}
