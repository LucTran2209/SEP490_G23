using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.UserGroups
{
    public interface IUserGroupRepository : IBaseRepository<UserGroup, Guid>
    {
    }
}
