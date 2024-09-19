using BE.Application.Services.Roles.RolerServiceInputDto;
using BE.Application.Services.Roles.RoleServiceOutputDto;
using BE.Domain.Entities.Roles;

namespace BE.Application.Services.Roles
{
	public static class RoleExtention
	{
		public static Role ToEntity(this AddNewRoleInputDto command)
		{
			return new Role
			{
				RoleName = command.RoleName,
				Description = command.Description
			};
		}

		public static GetListRoleOutputDto ToDto(this Role role)
		{
			return new GetListRoleOutputDto
			{
				RoleId = role.Id,
				RoleName = role.RoleName,
				Description = role.Description
			};
		}
	}
}
