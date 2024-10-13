using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;

namespace BE.Domain.Entities
{
    public class Role : EntityAuditBase, IEntityBase
    {
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<UserRole>? UserRoles { get; set; }
    }
}