using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class RechargeHistory : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public decimal? BeforeBalance { get; set; }
        public decimal? AmountRecharge { get; set; }
        public RechargeStatus RechargeStatus { get; set; }  
        public RechargeType RechargeType {  get; set; }

        public virtual User? User {  get; set; }
    }
}
