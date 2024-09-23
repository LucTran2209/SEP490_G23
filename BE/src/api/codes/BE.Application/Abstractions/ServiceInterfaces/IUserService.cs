using BE.Application.Common.Results;
using BE.Application.Services.Users.UserServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IUserService
    {
        Task<ResultService> CreateAsync(CreateUserInputDto inputDto);
        Task<ResultService> GetListUserAsync();
        Task<ResultService> UpadteUserAsync(UpadteUserInputDto inputDto);
        Task<ResultService> FindUserAsync(FindUserInputDto inputDto);
        Task<ResultService> ActiveUser(ActiveUserInputDto inputDto);
        Task<ResultService> FillterUser(FilterUserInputDto inputDto);
    }
}
