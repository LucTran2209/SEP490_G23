using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Entities.RentalRequests;
using BE.Domain.Entities.Rentals;
using BE.Domain.Entities.UserGroups;
using BE.Domain.Entities.UserRoles;

namespace BE.Domain.Entities.Users
{
    public class User : EntityAuditBase, IEntityBase<Guid>
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
        public bool Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Introduction { get; set; } = null!;
        public string AvatarPersonal { get; set; } = null!;
        public bool IsActive { get; set; }
        public string RefreshToken { get; set; } = null!;
        public virtual ICollection<UserRole>? UserRoles { get; set; }
        public virtual ICollection<UserGroup>? UserGroups { get; set; }
        public virtual ICollection<Rental>? Rentals { get; set; }
        public virtual ICollection<RentalRequest>? RentalRequests { get; set; }
    }
}
