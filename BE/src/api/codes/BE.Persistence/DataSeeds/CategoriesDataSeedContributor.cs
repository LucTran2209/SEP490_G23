using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BE.Persistence.DataSeeds;

public class CategoriesDataSeedContributor : IDataSeedContributor
{
    private readonly ApplicationDbContext context;

    public CategoriesDataSeedContributor(ApplicationDbContext context)
    {
        this.context = context;
    }

    public async Task SeedAsync()
    {
        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                new Category
                {
                    Id = Guid.NewGuid(),
                    CategoryName = "Electronics",
                    Description = "Devices and gadgets."
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CategoryName = "Furniture",
                    Description = "Home and office furniture."
                }
            };

            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }
    }
}
