using BE.Domain.Entities;
using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Task<Product?> FindByIdAsync(Guid id);
        IQueryable<Product> GetAll();
        Task AddAsync(Product entity);
        Task UpdateAsync(Product entity);
        Task DeleteAsync(Product entity);
    }
}
