using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.Categories
{
    public interface ICategoryRepository : IBaseRepository<Category,Guid>
    {
    }
}
