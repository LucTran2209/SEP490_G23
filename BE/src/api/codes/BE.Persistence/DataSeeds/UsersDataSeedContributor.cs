using BE.Domain.Entities;
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
                Id = Guid.NewGuid(),
                FullName = "Admin",
                UserName = "admin",
                Password = "$2a$11$5TyZkYOwEOLe1y0YFFCUtussjnf4RVYqw3TbSTVMF92Q83TuW2OJC",
                Email = email,
                PhoneNumber = "1234567890",
                Address = "Ha Noi",
                Gender = true,
                DateOfBirth = DateTime.Now,
                Introduction = string.Empty,
                AvatarPersonal = string.Empty,
                IsActive = true,
                RefreshToken = "12212"

            };

            await context.Users.AddAsync(user);
        }

        await context.SaveChangesAsync();
    }
}
