using BE.Application.Common.Results;
using BE.Application.Services.Roles.RolerServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
	public interface IRoleService
	{
		Task<ResultService> CreateAsync(AddNewRoleInputDto inputDto);

		Task<ResultService> GetListRoleAsync(GetListRoleInputDto inputDto);
		Task<ResultService> ChangeRoleAsync(ChangeRoleInputDto inputDto);
		Task<ResultService> UpdateRoleAsync(UpdateNewRoleInputDto inputDto);
		Task<ResultService> ActiveRoleAsync(ActiveRoleInputDto inputDto);
	}
}
