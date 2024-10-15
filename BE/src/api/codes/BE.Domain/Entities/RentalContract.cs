using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class RentalContract : EntityAuditBase
    {
        public Guid ContractId { get; set; }
        public Guid RentalPostId { get; set; }

        public virtual Contract? Contract { get; set; }
        public virtual RentalPost? RentalPost { get; set; }
    }
}
