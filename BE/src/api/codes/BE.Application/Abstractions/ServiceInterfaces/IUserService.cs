using BE.Application.Common.Results;
using BE.Application.Services.Users.UserServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IUserService
    {
        Task<ResultService> CreateAsync(CreateUserInputDto inputDto);
        Task<ResultService> GetListUserAsync(GetListUserInputDto inputDto);
        Task<ResultService> UpadteUserAsync(UpadteUserInputDto inputDto);
        Task<ResultService> GetUserByIdAsync(FindUserInputDto inputDto);
        Task<ResultService> ActiveUserAsync(ActiveUserInputDto inputDto);
    }
}
