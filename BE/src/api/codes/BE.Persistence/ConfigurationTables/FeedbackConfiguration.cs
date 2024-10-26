using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    public class FeedbackConfiguration : IEntityTypeConfiguration<Feedback>
    {
        public void Configure(EntityTypeBuilder<Feedback> builder)
        {
            builder.ToTable("Feedbacks");

            builder.HasKey(f => f.Id);

            builder.Property(f => f.Comment)
                   .IsRequired()
                   .HasMaxLength(500);

            builder.Property(f => f.Rating)
                   .IsRequired();

            builder.Property(f => f.UserName)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.HasOne(f => f.Product)
                   .WithMany(p => p.Feedbacks)
                   .HasForeignKey(f => f.ProductId)
                   .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}
