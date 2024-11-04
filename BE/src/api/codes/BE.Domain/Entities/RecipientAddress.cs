using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class RecipientAddress : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public string? Name {  get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }

        public virtual User? User { get; set; }
    }
}
