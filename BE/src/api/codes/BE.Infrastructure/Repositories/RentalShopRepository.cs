using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class RentalShopRepository : BaseRepository, IRentalShopRepository
    {
        public RentalShopRepository(ApplicationDbContext context) : base(context) { }

        public async Task<RentalShop?> FindByIdAsync(Guid id)
        {
            var rentalShop = await context.RentalShops
                                          .Include(rs => rs.Products)
                                          .FirstOrDefaultAsync(rs => rs.Id == id);
            return rentalShop;
        }

        public IQueryable<RentalShop> GetAll()
        {
            var query = context.RentalShops.Include(rs => rs.Products).AsQueryable();
            return query;
        }

        public async Task AddAsync(RentalShop entity)
        {
            await context.RentalShops.AddAsync(entity);
        }

        public Task UpdateAsync(RentalShop entity)
        {
            context.RentalShops.Update(entity);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(RentalShop entity)
        {
            context.RentalShops.Remove(entity);
            return Task.CompletedTask;
        }
    }
}
