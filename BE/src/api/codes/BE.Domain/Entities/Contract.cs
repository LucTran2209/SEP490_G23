using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class Contract : EntityAuditBase
    {
        public string? ClauseName {  get; set; }
        public string? ClauseContent { get; set; }
        public ContractStatus Status { get; set; }
        public string? FileAttach { get; set; }

        public virtual ICollection<RentalContract>? RentalContracts { get; set; }
    }
}
