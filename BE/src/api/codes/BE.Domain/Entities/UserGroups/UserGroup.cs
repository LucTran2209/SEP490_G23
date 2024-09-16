using BE.Domain.Abstractions;
using BE.Domain.Entities.Groups;
using BE.Domain.Entities.Users;

namespace BE.Domain.Entities.UserGroups
{
    public class UserGroup : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public Guid GroupId { get; set; }
        public bool IsAdminGroup {  get; set; }
        public bool AllowPost {  get; set; }
        public virtual User? User { get; set; }
        public virtual Group? Group { get; set; }
    }
}
