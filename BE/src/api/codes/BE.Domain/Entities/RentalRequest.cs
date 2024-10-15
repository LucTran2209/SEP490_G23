using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class RentalRequest : EntityAuditBase
    {
        public Guid RentalPostId { get; set; }
        public string? Address {  get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public RequestStatus Status { get; set; }
        public string? Note { get; set; }

        public virtual RentalPost? RentalPost { get; set; }
    }
}
