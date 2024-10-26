using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IFeedbackRepository : IBaseRepository<Feedback>
    {
        IQueryable<Feedback> GetAll();
    }
}
