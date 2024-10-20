using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    public class RentalShopConfiguration : IEntityTypeConfiguration<RentalShop>
    {
        public void Configure(EntityTypeBuilder<RentalShop> builder)
        {
            builder.ToTable("RentalShops");  
            builder.HasKey(rs => rs.Id); 

            builder.Property(rs => rs.ShopName)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(rs => rs.Address)
                   .HasMaxLength(250);

            builder.HasOne(rs => rs.User)
                   .WithMany(u => u.RentalShops)
                   .HasForeignKey(rs => rs.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
