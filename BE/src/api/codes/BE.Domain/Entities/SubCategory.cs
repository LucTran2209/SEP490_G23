using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class SubCategory : EntityAuditBase
    {
        public string SubCategoryName { get; set; } = string.Empty;
        public string? Description { get; set; }

        public Guid CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
