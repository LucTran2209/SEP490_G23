using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class SubCategoryRepository : BaseRepository, ISubCategoryRepository
    {
        public SubCategoryRepository(ApplicationDbContext context) : base(context) { }

        public async Task AddAsync(SubCategory entity)
        {
            await context.SubCategories.AddAsync(entity);
        }

        public Task DeleteAsync(SubCategory entity)
        {
            throw new NotImplementedException();
        }

        public async Task<SubCategory?> FindByIdAsync(Guid id)
        {
            var c = await context.SubCategories.FindAsync(id);
            return c;
        }

        public IQueryable<SubCategory> GetAll()
        {
            return context.SubCategories.Include(i => i.Category).AsQueryable();
        }

        public Task UpdateAsync(SubCategory entity)
        {
            context.SubCategories.Update(entity);

            return Task.CompletedTask;
        }
    }
}
