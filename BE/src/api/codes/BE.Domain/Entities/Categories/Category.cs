using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Entities.Products;
using BE.Domain.Entities.SubCategories;

namespace BE.Domain.Entities.Categories
{
    public class Category : EntityAuditBase, IEntityBase<Guid>
    {
        public Guid Id { get; set; }
        public Guid FieldCategoryId { get; set; }
        public string CategoryName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public virtual FieldCategory? FieldCategory { get; set; }
        public virtual ICollection<Product>? Products { get; set; }
    }
}
