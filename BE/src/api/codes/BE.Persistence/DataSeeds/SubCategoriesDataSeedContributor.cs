using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BE.Persistence.DataSeeds;

public class SubCategoriesDataSeedContributor : IDataSeedContributor
{
    private readonly ApplicationDbContext context;

    public SubCategoriesDataSeedContributor(ApplicationDbContext context)
    {
        this.context = context;
    }

    public async Task SeedAsync()
    {
        if (!await context.SubCategories.AnyAsync())
        {
            var electronicsCategory = await context.Categories
                .SingleOrDefaultAsync(c => c.CategoryName == "Electronics");

            var furnitureCategory = await context.Categories
                .SingleOrDefaultAsync(c => c.CategoryName == "Furniture");

            var subCategories = new List<SubCategory>
            {
                new SubCategory
                {
                    Id = Guid.NewGuid(),
                    SubCategoryName = "Mobile Phones",
                    Description = "Smartphones and accessories.",
                    CategoryId = electronicsCategory?.Id ?? Guid.NewGuid()
                },
                new SubCategory
                {
                    Id = Guid.NewGuid(),
                    SubCategoryName = "Laptops",
                    Description = "Personal computers and accessories.",
                    CategoryId = electronicsCategory?.Id ?? Guid.NewGuid()
                },
                new SubCategory
                {
                    Id = Guid.NewGuid(),
                    SubCategoryName = "Office Chairs",
                    Description = "Chairs for office use.",
                    CategoryId = furnitureCategory?.Id ?? Guid.NewGuid()
                },
                new SubCategory
                {
                    Id = Guid.NewGuid(),
                    SubCategoryName = "Tables",
                    Description = "Dining and office tables.",
                    CategoryId = furnitureCategory?.Id ?? Guid.NewGuid()
                }
            };

            await context.SubCategories.AddRangeAsync(subCategories);
            await context.SaveChangesAsync();
        }
    }
}
