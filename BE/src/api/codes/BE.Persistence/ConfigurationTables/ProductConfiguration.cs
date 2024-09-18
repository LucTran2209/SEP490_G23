using BE.Persistence.Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BE.Domain.Entities.Products;
using BE.Domain.Entities.Rentals;

namespace BE.Persistence.ConfigurationTables
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable(ConstantTableNames.Products);
            builder.HasKey(x => x.Id);

            builder.HasOne(p => p.Rental)
                   .WithOne(rt => rt.Product)
                   .HasForeignKey<Rental>(rt => rt.ProductId);
            
            builder.HasOne(p => p.Category)
                   .WithMany(c => c.Products)
                   .HasForeignKey(p => p.CategoryId);
        }
    }
}