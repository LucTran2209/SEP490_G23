using BE.Domain.Entities.Categories;
using BE.Persistence.Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BE.Domain.Entities.SubCategories;

namespace BE.Persistence.ConfigurationTables
{
    public class FieldCategoryConfiguration : IEntityTypeConfiguration<FieldCategory>
    {
        public void Configure(EntityTypeBuilder<FieldCategory> builder)
        {
            builder.ToTable(ConstantTableNames.FieldCategories);
            builder.HasKey(x => x.Id);
            
            builder.HasMany(x => x.Categories)
                   .WithOne(c => c.FieldCategory)
                   .HasForeignKey(c => c.FieldCategoryId);
        }
    }
}