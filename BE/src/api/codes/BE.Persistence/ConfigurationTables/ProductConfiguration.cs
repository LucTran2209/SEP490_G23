using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");  
            builder.HasKey(p => p.Id);  

            builder.Property(p => p.ProductName)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(p => p.Description)
                   .HasMaxLength(500);

            builder.Property(p => p.Evaluate)
                   .HasColumnType("decimal(2,1)")  
                   .HasDefaultValue(0);

            builder.Property(p => p.RentalPrice)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(p => p.DepositPrice)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(p => p.RentalLimitDays)
                   .IsRequired();

            builder.HasOne(p => p.RentalShop)
                   .WithMany(rs => rs.Products)
                   .HasForeignKey(p => p.RentalShopId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(p => p.SubCategory)
                   .WithMany(sc => sc.Products)
                   .HasForeignKey(p => p.SubCategoryId)
                   .OnDelete(DeleteBehavior.Cascade);  

            builder.HasMany(p => p.ProductImages)
                    .WithOne(pi => pi.Product)
                    .HasForeignKey(pi => pi.ProductId)
                    .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
