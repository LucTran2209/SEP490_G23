﻿using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext context) : base(context) { }

        public async Task AddAsync(Category entity)
        {
            await context.Categories.AddAsync(entity);
        }

        public Task DeleteAsync(Category entity)
        {
            throw new NotImplementedException();
        }

        public async Task<Category?> FindByIdAsync(Guid id)
        {
            var c = await context.Categories.FindAsync(id);

            return c;
        }

        public IQueryable<Category> GetAll()
        {
            return context.Categories.Include(c => c.SubCategories).AsQueryable();
        }

        public Task UpdateAsync(Category entity)
        {
            context.Categories.Update(entity);

            return Task.CompletedTask;
        }
    }
}
