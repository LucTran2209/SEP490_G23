using BE.Domain.Abstractions.Enums;
using BE.Domain.Entities;

namespace BE.Application.Common.Dtos
{
    public class OrderDto
    {
        public Guid? Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? VoucherId { get; set; }
        public string? Code { get; set; }
        public string? RecipientName { get; set; }
        public string? RecipientPhoneNumber { get; set; }
        public string? RecipientEmail { get; set; }
        public string? RecipientAddress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalRentPrice { get; set; }
        public decimal TotalDepositPrice { get; set; }
        public string? Note { get; set; }
        public PaymentType PaymentType { get; set; }
       
        //    public virtual User? User { get; set; }
        //    public virtual Voucher? Voucher { get; set; }
        //    public virtual ICollection<OrderDetail>? OrderDetails { get; set; }
        //    public virtual ICollection<OrderStatus>? OrderStatuses { get; set; }
        //
    }
}
