using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class RentalShopRepository : BaseRepository, IRentalShopRepository
    {
        public RentalShopRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<RentalShop?> FindByIdAsync(Guid id)
        {
            return await context.RentalShops.Include(rs => rs.Products)
                                            .FirstOrDefaultAsync(rs => rs.Id == id);
        }

        public IQueryable<RentalShop> GetAll()
        {
            return context.RentalShops.Include(rs => rs.Products).AsQueryable();
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

        public async Task<RentalShop?> GetRentalShopByIdAsync(Guid id)
        {
            return await context.RentalShops.FirstOrDefaultAsync(rs => rs.UserId == id || rs.Id == id);
        }

        public async Task<RentalShop?> GetRentalShopByNotActiveAsync(Guid Id)
        {
            return await context.RentalShops.FirstOrDefaultAsync(rs => rs.Id == Id && rs.IsActive == false);
        }

        public async Task<RentalShop?> GetAllRentalShopByNotActiveAsync()
        {
            return await context.RentalShops.FirstOrDefaultAsync(rs => rs.IsActive == false);
        }
    }
}