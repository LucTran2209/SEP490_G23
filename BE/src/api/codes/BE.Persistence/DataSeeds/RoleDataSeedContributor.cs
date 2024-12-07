
using BE.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BE.Persistence.DataSeeds
{
    public class RoleDataSeedContributor : IDataSeedContributor
    {
        private readonly ApplicationDbContext context;

        public RoleDataSeedContributor(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task SeedAsync()
        {
        }
    }
}
