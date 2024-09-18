using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Entities.UserRoles;

namespace BE.Domain.Entities.Roles
{
    public class Role : EntityAuditBase, IEntityBase<Guid>
    {
        public Guid Id { get; set; }
        public string RoleName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public virtual ICollection<UserRole>? UserRoles { get; set; }
    }
}
