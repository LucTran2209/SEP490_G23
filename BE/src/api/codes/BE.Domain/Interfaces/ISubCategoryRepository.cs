using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface ISubCategoryRepository : IBaseRepository<SubCategory>
    {
        IQueryable<SubCategory> GetAll();
    }
}
