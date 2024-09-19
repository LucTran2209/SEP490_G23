using BE.Domain.Entities.Roles;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
	public class RoleRepository : BaseRepository, IRoleRepository
	{
		public RoleRepository(ApplicationDbContext context) : base(context)
		{
		}

		public void Delete(Role entity)
		{
			context.Roles.Remove(entity);
		}

		public async Task<Role> FindByIdAsync(Guid id)
		{
			var role = await context.Roles.SingleOrDefaultAsync(r => r.Id == id);
			return role;
		}

		public IQueryable<Role> GetAll()
		{
			var query = context.Roles.AsQueryable();
			return query;
		}
		public async void Insert(Role entity)
		{
			await context.Roles.AddAsync(entity);
		}

		public void Update(Role entity)
		{
			context.Roles.Update(entity);
		}
	}
}
