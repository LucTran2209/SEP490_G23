using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    public class RechargeHistoryConfiguration : IEntityTypeConfiguration<RechargeHistory>
    {
        public void Configure(EntityTypeBuilder<RechargeHistory> builder)
        {
            builder.ToTable("RechargeHistories");
            builder.HasKey(pi => pi.Id);

            builder.HasOne(r => r.User).WithMany(u => u.RechargeHistories).HasForeignKey(r => r.UserId).OnDelete(DeleteBehavior.Cascade);                   
        }
    }
}
