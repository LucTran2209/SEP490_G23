using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context) { }

        public async Task<Product?> FindByIdAsync(Guid id)
        {
            return await context.Products
                .Include(p => p.RentalShop)
                .Include(p => p.ProductImages)
                .Include(p => p.SubCategory)
                    .ThenInclude(sc => sc.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public IQueryable<Product> GetAll()
        {
            var query = context.Products.Include(p => p.RentalShop).Include(p => p.ProductImages).AsQueryable();

            return query;
        }

        public async Task AddAsync(Product entity)
        {
            await context.Products.AddAsync(entity);
        }

        public Task UpdateAsync(Product entity)
        {
            context.Products.Update(entity);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Product entity)
        {
            context.Products.Remove(entity);
            return Task.CompletedTask;
        }
    }
}
