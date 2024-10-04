using BE.Persistence.Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BE.Domain.Entities.Rentals;

namespace BE.Persistence.ConfigurationTables
{
    public class RentalConfiguration : IEntityTypeConfiguration<Rental>
    {
        public void Configure(EntityTypeBuilder<Rental> builder)
        {
            builder.ToTable(ConstantTableNames.Rentals);

            builder.HasKey(x => x.Id);

            builder.HasMany(rt => rt.RentalRequests)
                   .WithOne(rq => rq.Rental)
                   .HasForeignKey(rq => rq.RentalId);
        }
    }
}
