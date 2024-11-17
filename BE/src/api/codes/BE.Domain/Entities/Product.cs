using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class Product : EntityAuditBase
    {
        public string? ProductName { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public Guid SubCategoryId { get; set; }
        public Guid RentalShopId { get; set; }
        public decimal RentalPrice { get; set; }
        public decimal DepositPrice { get; set; }
        public int RentalLimitDays { get; set; }
        public decimal Evaluate { get; set; }
        public virtual SubCategory SubCategory { get; set; } = null!;
        public virtual RentalShop RentalShop { get; set; } = null!;
        public virtual ICollection<ProductImage>? ProductImages { get; set; }
        public virtual ICollection<Feedback>? Feedbacks { get; set; }
    }
}
