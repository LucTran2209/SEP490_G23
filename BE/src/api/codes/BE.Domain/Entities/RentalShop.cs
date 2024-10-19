using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class RentalShop : EntityAuditBase
    {
        public string ShopName { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Product>? Products { get; set; } 
    }
}
