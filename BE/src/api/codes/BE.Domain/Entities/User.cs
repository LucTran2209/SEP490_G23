using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;

namespace BE.Domain.Entities
{
    public class User : EntityAuditBase, IEntityBase
    {
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public bool Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? RefreshToken { get; set; }
        public string? Introduction { get; set; }
        public string? AvatarPersonal { get; set; }
        public bool IsActive { get; set; }
        public decimal Balance { get; set; }

        public virtual ICollection<RentalShop>? RentalShops { get; set; }
        public virtual ICollection<RentalRequest>? RentalRequests { get; set; }
        public virtual ICollection<UserRole>? UserRoles { get; set; }
    }
}