using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IProductImageRepository : IBaseRepository<ProductImage>
    {
        Task RemoveRangeAsync(List<ProductImage>? image);
        Task AddRangeAsync(List<ProductImage>? image);
    }
}
