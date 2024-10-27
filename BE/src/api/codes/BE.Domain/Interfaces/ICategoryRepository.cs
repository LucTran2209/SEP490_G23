using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        IQueryable<Category> GetAll();
    }
}
