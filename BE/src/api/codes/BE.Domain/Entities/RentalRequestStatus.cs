using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class RentalRequestStatus : EntityAuditBase
    {
        public Guid RentalRequestId { get; set; }
        public string? Message { get; set; }
        public RequestStatus Status { get; set; }
        public string? FileAttach {  get; set; }

        public virtual RentalRequest? RentalRequest { get; set; }
    }
}
