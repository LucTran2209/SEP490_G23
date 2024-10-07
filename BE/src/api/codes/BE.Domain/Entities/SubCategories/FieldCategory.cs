using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Entities.Categories;

namespace BE.Domain.Entities.SubCategories
{
    public class FieldCategory : EntityAuditBase, IEntityBase<Guid>
    {
        public Guid Id { get; set; }
        public string? FieldCategoryName {  get; set; }
        public virtual ICollection<Category>? Categories { get; set;}
    }
}
