using BE.Application.Common.Results;
using BE.Application.Services.Users.UserServiceInputDto;
using BE.Domain.Entities.Users;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IUserService
    {
        Task<ResultService> CreateAsync(CreateUserInputDto inputDto);
        Task UpdateRefeshToken(User user);
    }
}
