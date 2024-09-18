using BE.Domain.Entities.RentalRequests;
using BE.Persistence.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    public class RentalRequestConfiguration : IEntityTypeConfiguration<RentalRequest>
    {
        public void Configure(EntityTypeBuilder<RentalRequest> builder)
        {
            builder.ToTable(ConstantTableNames.RentalRequests);

            builder.HasKey(x => new {x.RentalId, x.UserId});
            
        }
    }
}

