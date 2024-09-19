using BE.Persistence.Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using BE.Domain.Entities.ActivityLogs;

namespace BE.Persistence.ConfigurationTables
{
    public class ActivityLogConfiguration : IEntityTypeConfiguration<ActivityLog>
    {
        public void Configure(EntityTypeBuilder<ActivityLog> builder)
        {
            builder.ToTable(ConstantTableNames.ActivityLogs);
            builder.HasKey(x => x.Id);

        }
    }
}