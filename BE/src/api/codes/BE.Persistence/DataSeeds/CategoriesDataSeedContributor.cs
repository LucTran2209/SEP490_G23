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
        //if (!await context.Categories.AnyAsync())
        //{
        //    var categories = new List<Category>
        //    {
        //        new Category
        //        {
        //            CategoryName = "Dụng cụ điện",
        //            Description = "Dụng cụ dùng trong ngành điện"
        //        },
        //        new Category
        //        {
        //            CategoryName = "Dụng cụ thể thao",
        //            Description = "Dụng cụ thể thao bao gồm vợt, cầu, lưới"
        //        }
        //    };

        //    await context.Categories.AddRangeAsync(categories);
        //    await context.SaveChangesAsync();
        //}
    }
}
