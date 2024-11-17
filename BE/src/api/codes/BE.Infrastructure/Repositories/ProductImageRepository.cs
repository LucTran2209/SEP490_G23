using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;

namespace BE.Infrastructure.Repositories
{
    internal class ProductImageRepository : BaseRepository, IProductImageRepository
    {
        public ProductImageRepository(ApplicationDbContext context) : base(context)
        {
        }

        public Task AddAsync(ProductImage entity)
        {
            throw new NotImplementedException();
        }

        public async Task AddRangeAsync(List<ProductImage>? image)
        {
            await context.ProductImages.AddRangeAsync(image!);

            await context.SaveChangesAsync();
        }

        public Task DeleteAsync(ProductImage entity)
        {
            throw new NotImplementedException();
        }

        public Task<ProductImage?> FindByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task RemoveRangeAsync(List<ProductImage>? image)
        {
            context.ProductImages.RemoveRange(image!);

            await context.SaveChangesAsync();
        }

        public Task UpdateAsync(ProductImage entity)
        {
            throw new NotImplementedException();
        }
    }
}
