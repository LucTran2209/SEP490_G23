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
            var product = await context.Products
                                       .Include(p => p.RentalShop)
                                       .FirstOrDefaultAsync(p => p.Id == id);
            return product;
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
