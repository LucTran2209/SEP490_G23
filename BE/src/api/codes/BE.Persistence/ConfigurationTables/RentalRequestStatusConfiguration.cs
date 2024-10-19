using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    internal sealed class RentalRequestStatusConfiguration : IEntityTypeConfiguration<RentalRequestStatus>
    {
        public void Configure(EntityTypeBuilder<RentalRequestStatus> builder)
        {
            builder.ToTable("RentalRequestStatuses");

            builder.HasKey(rs => rs.Id);

            builder.HasOne(rs => rs.RentalRequest)
                   .WithOne(r => r.RentalRequestStatus)
                   .HasForeignKey<RentalRequestStatus>(rs => rs.RentalRequestId);

        }
    }
}
