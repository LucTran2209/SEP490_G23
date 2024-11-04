using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Persistence.ConfigurationTables
{
    internal class RecipientAddressConfiguration : IEntityTypeConfiguration<RecipientAddress>
    {
        public void Configure(EntityTypeBuilder<RecipientAddress> builder)
        {
            builder.ToTable("RecipientAddresses");
            builder.HasKey(v => v.Id);

            builder.HasOne(ra => ra.User)
                .WithMany(u => u.RecipientAddresses)
                .HasForeignKey(ra => ra.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
