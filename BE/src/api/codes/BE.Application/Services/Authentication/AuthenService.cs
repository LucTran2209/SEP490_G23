using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.DependencyInjections;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities.Users;
using FluentValidation;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace BE.Application.Services.Authentication
{
    public class AuthenService : BaseService, IAuthenticationService
    {

        private readonly IValidator<LoginByUserNamePasswordInputDto> loginByUserNamePasswordValidator;
        private readonly JwtOption jwtOption;

        public AuthenService(IUnitOfWork unitOfWork,
                             IOptions<JwtOption> jwtOption,
                             IValidator<LoginByUserNamePasswordInputDto> loginByUserNamePasswordValidator) : base(unitOfWork)
        {
            this.loginByUserNamePasswordValidator = loginByUserNamePasswordValidator;
            this.jwtOption = jwtOption.Value;

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

            var user = await unitOfWork.UserRepository.FirstOrDefaultAsync(inputDto.UserName);

            if (user == null || !inputDto.Password.VerifyPassword(user.Password))
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.NotFound.ToString(),
                    Message = "Wrong UserName or Password"
                };
            }

            string accessToken = GenerateToken(user);

            SetCookie(accessToken);

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "",
                Datas = accessToken
            };
        }

        private void SetCookie(string accessToken)
        {

        }

        public Task<ResultService> LogoutAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ResultService> RegisterAsync(RegisterInputDto inputDto)
        {
            throw new NotImplementedException();
        }

        private string GenerateToken(User user)
        {

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            if (user.UserRoles?.Count > 0)
            {
                foreach (var role in user.UserRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role.Role.RoleName));
                }
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOption.Secret));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                issuer: jwtOption.ValidIssuer,
                audience: jwtOption.ValidAudience,
                authClaims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
