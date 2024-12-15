using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class RentalShop : EntityAuditBase
    {
        public Guid UserId { get; set; }
        public string? AvatarShop { get; set; }
        public string? Banner { get; set; }
        public string? ShopName { get; set; }
        public string? ImageFont { get; set; }
        public string? ImageBack { get; set; }
        public string? TaxNumber { get; set; }
        public string? BusinessLicenseFile { get; set; }
        public int RentalScale { get; set; }
        public string? Address { get; set; }
        //public string? KinhDo { get; set; }
        //public string? ViDo { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? AdminNote { get; set; }
        public RequestShop Status { get; set; }
        public bool IsActive { get; set; }
        public string? Description { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Product>? Products { get; set; }
    }
}
