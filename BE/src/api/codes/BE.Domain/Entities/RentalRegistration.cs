using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;

namespace BE.Domain.Entities
{
    public class RentalRegistration : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public string? Identification { get; set; }
        public string? ImageFont { get; set; }
        public string? ImageBack { get; set; }
        public string? TaxNumber { get; set; }
        public string? BusinessLicenseFile { get; set; }
        public int RentalScale { get; set; }
        public string? RepositoryAddress { get; set; }

        // Navigation properties
        public User? User { get; set; }
    }

}
