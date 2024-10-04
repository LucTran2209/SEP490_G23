using BE.Application.Common.Results;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Domain.Entities.Users;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IAuthenticationService
    {
        Task<ResultService> LoginByUserNamePasswordAsync(LoginByUserNamePasswordInputDto inputDto);
        Task<ResultService> ExternalLoginAsync(ExternalLoginInputDto inputDto);
        Task<ResultService> ForgotPasswordAsync(ForgotPasswordInputDto inputDto);
        Task<ResultService> ChangePasswordAsync(ChangePasswordInputDto inputDto);
        Task<ResultService> LogoutAsync();
        Task<ResultService> RegisterAsync(RegisterInputDto inputDto);
        public string GenerateToken(User user);
    }
}
