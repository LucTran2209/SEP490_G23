using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.Products
{
    public interface IProductRepository : IBaseRepository<Product,Guid>
    {
    }
}
