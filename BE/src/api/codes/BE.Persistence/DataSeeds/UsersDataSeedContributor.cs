using BE.Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace BE.Persistence.DataSeeds;

public class UsersDataSeedContributor : IDataSeedContributor
{
    private readonly ApplicationDbContext context;

    public UsersDataSeedContributor(ApplicationDbContext context)
    {
        this.context = context;
    }

    public async Task SeedAsync()
    {
        var email = "abc@gamil.com";
        var user = await context.Users.SingleOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            user = new User()
            {

            };

            await context.Users.AddAsync(user);
        }

        await context.SaveChangesAsync();
    }
}
