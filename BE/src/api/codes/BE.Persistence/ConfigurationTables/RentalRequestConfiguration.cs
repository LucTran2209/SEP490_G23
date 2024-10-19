using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    internal sealed class RentalRequestConfiguration : IEntityTypeConfiguration<RentalRequest>
    {
        public void Configure(EntityTypeBuilder<RentalRequest> builder)
        {
            builder.ToTable("RentalRequests");

            builder.HasKey(r => r.Id);

            builder.HasOne(r => r.RentalRequestStatus)
                   .WithOne(rs => rs.RentalRequest)
                   .HasForeignKey<RentalRequestStatus>(rs => rs.RentalRequestId)
                   .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
