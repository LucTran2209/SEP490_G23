using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Persistence.ConfigurationTables
{
    public class SubCategoryConfiguration
    {
        public void Configure(EntityTypeBuilder<SubCategory> builder)
        {
            builder.ToTable("SubCategories");

            builder.HasKey(sc => sc.Id);

            builder.Property(sc => sc.SubCategoryName)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(sc => sc.Description)
                   .HasMaxLength(int.MaxValue);

            builder.HasOne(sc => sc.Category)
                   .WithMany(c => c.SubCategories)
                   .HasForeignKey(sc => sc.CategoryId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
