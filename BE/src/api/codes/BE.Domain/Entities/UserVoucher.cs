using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class UserVoucher : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public Guid VoucherId { get; set; }

        public virtual User? User { get; set; }
        public virtual Voucher? Voucher { get; set; }
    }
}
