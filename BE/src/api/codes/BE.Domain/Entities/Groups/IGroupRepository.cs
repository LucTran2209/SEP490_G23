using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.Groups
{
    public interface IGroupRepository : IBaseRepository<Group,Guid>
    {
    }
}
