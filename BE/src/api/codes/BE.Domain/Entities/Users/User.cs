using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;

namespace BE.Domain.Entities.Users
{
    public class User : EntityAuditBase, IEntityBase<Guid>
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set;} = null!;
        public string Email { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;

    }
}
