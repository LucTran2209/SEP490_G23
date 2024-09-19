using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.Roles
{
    public interface IRoleRepository : IBaseRepository<Role,Guid>
    {
		IQueryable<Role> GetAll();  
	}
}
