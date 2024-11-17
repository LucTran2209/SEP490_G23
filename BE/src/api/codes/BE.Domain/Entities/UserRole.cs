using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class UserRole : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }

        public virtual Role? Role { get; set; }
        public virtual User? User { get; set; }
    }
}
