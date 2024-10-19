using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class RentalRequest : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public Guid RentalRequestStatusId { get; set; }
        public string? Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Note { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual RentalRequestStatus RentalRequestStatus { get; set; } = null!;

    }
}
