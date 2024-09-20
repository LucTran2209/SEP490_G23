using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Application.Services.Users.UserServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using FluentValidation;
using System.Net;

namespace BE.Application.Services.Authentication
{
    public class AuthenService : BaseService, IAuthenticationService
    {
        private readonly IValidator<LoginByUserNamePasswordInputDto> loginByUserNamePasswordValidator;
        public AuthenService(IUnitOfWork unitOfWork,
                                IValidator<LoginByUserNamePasswordInputDto> loginByUserNamePasswordValidator) : base(unitOfWork)
        {
           this.loginByUserNamePasswordValidator = loginByUserNamePasswordValidator;
        }

        public Task<ResultService> ChangePasswordAsync(ChangePasswordInputDto inputDto)
        {
            throw new NotImplementedException();
        }

        public Task<ResultService> ExternalLoginAsync(ExternalLoginInputDto inputDto)
        {
            throw new NotImplementedException();
        }

        public Task<ResultService> ForgotPasswordAsync(ForgotPasswordInputDto inputDto)
        {
            throw new NotImplementedException();
        }

        public async Task<ResultService> LoginByUserNamePasswordAsync(LoginByUserNamePasswordInputDto inputDto)
        {
            await loginByUserNamePasswordValidator.ValidateAndThrowAsync(inputDto);

            var user = unitOfWork.UserRepository.FirstOrDefaultAsync(inputDto.UserName, inputDto.Password.EncodePassword());

            if (user == null)
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.NotFound.ToString(),
                    Message = "Wrong UserName Password"
                };
            }

            
        }

        public Task<ResultService> LogoutAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ResultService> RegisterAsync(RegisterInputDto inputDto)
        {
            throw new NotImplementedException();
        }
    }
}
