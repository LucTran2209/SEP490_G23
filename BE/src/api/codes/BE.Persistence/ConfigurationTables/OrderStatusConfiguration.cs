using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    public class OrderStatusConfiguration : IEntityTypeConfiguration<OrderStatus>
    {
        public void Configure(EntityTypeBuilder<OrderStatus> builder)
        {
            builder.ToTable("OrderStatuses");
            builder.HasKey(os => os.Id);

            builder.HasOne(os => os.Order)
                .WithMany(o => o.OrderStatuses)
                .HasForeignKey(os => os.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(os => os.Status)
                .IsRequired();

            builder.Property(os => os.Message)
                .HasMaxLength(int.MaxValue);

            builder.Property(os => os.FileAttach)
                .HasMaxLength(int.MaxValue);
        }
    }
}
