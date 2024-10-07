using BE.Domain.Abstractions;
using BE.Domain.Entities.Roles;
using BE.Domain.Entities.Users;

namespace BE.Domain.Entities.UserRoles
{
    public class UserRole : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }
        public virtual Role? Role { get; set; }
        public virtual User? User { get; set; }
    }
}
