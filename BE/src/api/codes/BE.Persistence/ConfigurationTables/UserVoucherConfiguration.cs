using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BE.Persistence.ConfigurationTables
{
    public class UserVoucherConfiguration : IEntityTypeConfiguration<UserVoucher>
    {
        public void Configure(EntityTypeBuilder<UserVoucher> builder)
        {
            builder.ToTable("UserVoucheres");
            builder.HasKey(v => v.Id);

            builder.HasOne(uv => uv.User)
                .WithMany(u => u.UserVouchers)
                .HasForeignKey(uv => uv.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(uv => uv.Voucher)
                .WithMany(u => u.UserVouchers)
                .HasForeignKey(uv => uv.VoucherId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
