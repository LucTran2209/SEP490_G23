using BE.Domain.Entities;
using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        IQueryable<Product> GetAll();
    }
}
