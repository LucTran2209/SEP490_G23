﻿using BE.Domain.Entities;
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
        var email = "admin.erms@gmail.com";
        var user = await context.Users.SingleOrDefaultAsync(u => u.Email == email);

        if (await context.Roles.AnyAsync()) return;

        List<Role> roles = new List<Role>()
            {
                new Role(){Id = Guid.Parse("9fca96df-9e41-4975-8d7d-98605f01a0bd"), Name = "Admin"},
                new Role(){Id = Guid.Parse("ff841a42-fd7d-4a45-8a70-7de13e41cad3"), Name = "Guest"},
                new Role(){Id = Guid.Parse("61e16e2c-3899-4357-b5c6-a57a615bd8ff"), Name = "Lessor"},
                new Role(){Id = Guid.Parse("dae936b7-3505-4c7e-813a-9221e658be61"), Name = "Renter"},
            };

        await context.Roles.AddRangeAsync(roles);

        if (user == null)
        {
            user = new User()
            {
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

            var userRoleAdmin = new UserRole()
            {
                UserId = user.Id,
                RoleId = Guid.Parse("9fca96df-9e41-4975-8d7d-98605f01a0bd")
            };

            await context.Users.AddAsync(user);
            await context.UserRoles.AddAsync(userRoleAdmin);
        }

        await context.SaveChangesAsync();   
    }
}
