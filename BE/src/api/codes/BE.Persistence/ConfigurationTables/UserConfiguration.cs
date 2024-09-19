using BE.Domain.Entities.Users;
using BE.Persistence.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    internal sealed class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable(ConstantTableNames.Users);
            builder.HasKey(x => x.Id);

            builder.HasMany(u => u.UserRoles)
                   .WithOne(ur => ur.User)
                   .HasForeignKey(ur => ur.UserId);

            builder.HasMany(u => u.UserGroups)
                   .WithOne(gu => gu.User)
                   .HasForeignKey(gu => gu.UserId);

            builder.HasMany(u => u.Rentals)
                   .WithOne(r => r.User)
                   .HasForeignKey(r => r.UserId);
        }
    } 
}
