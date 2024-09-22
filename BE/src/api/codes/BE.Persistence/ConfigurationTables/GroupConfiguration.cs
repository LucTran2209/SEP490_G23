using BE.Domain.Entities.Groups;
using BE.Domain.Entities.Roles;
using BE.Persistence.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.ToTable(ConstantTableNames.Groups);
            builder.HasKey(x => x.Id);
            builder.HasMany(g => g.UserGroups)
                    .WithOne(gu => gu.Group)
                    .HasForeignKey(gu => gu.GroupId);
        }
    }
}

