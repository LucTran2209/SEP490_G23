using BE.Domain.Entities.UserGroups;
using BE.Persistence.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    public class UserGroupConfiguration : IEntityTypeConfiguration<UserGroup>
    {
        public void Configure(EntityTypeBuilder<UserGroup> builder)
        {
            builder.ToTable(ConstantTableNames.UserGroups);

            builder.HasKey(x => new { x.UserId, x.GroupId });

            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.GroupId).IsRequired();
        }
    }
}
