using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Entities.UserGroups;

namespace BE.Domain.Entities.Groups
{
    public class Group : EntityAuditBase, IEntityBase<Guid>
    {
        public Guid Id {  get; set; }
        public string GroupName {  get; set; } = null!;
        public string Description {  get; set; } = null!;
        public string Rule { get; set; } = null!;
        public string AvatarGroup { get; set; } = null!;
        public ICollection<UserGroup>? UserGroups { get; set; }
    }
}
