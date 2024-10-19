using BE.Application.Common.Results;
using BE.Application.Services.Authentication.AuthenServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IAuthenticationService
    {
        Task<ResultService> RegisterAsync(RegisterInputDto inputDto);
        Task<ResultService> LoginByUserNamePasswordAsync(LoginByUserNamePasswordInputDto inputDto);
        Task<ResultService> ExternalLoginAsync(ExternalLoginInputDto inputDto);
        Task<ResultService> ForgotPasswordAsync(ForgotPasswordInputDto inputDto);
        Task<ResultService> ChangePasswordAsync(ChangePasswordInputDto inputDto);
        Task<ResultService> ResetPassword(ResetPasswordInputDto inputDto);
        Task<ResultService> LogoutAsync();
    }
}
