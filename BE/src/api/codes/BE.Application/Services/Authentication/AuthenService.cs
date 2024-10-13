using AutoMapper;
using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.DependencyInjections;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Application.Services.Authentication.AuthenServiceOutputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
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
        private readonly IValidator<RegisterInputDto> registerValidator;
        private readonly IValidator<ChangePasswordInputDto> changePasswordValidator;
        private readonly JwtOption jwtOption;
        private readonly IMapper _mapper;

        public AuthenService(IUnitOfWork unitOfWork,
                             IUser user,
                             IOptions<JwtOption> jwtOption,
                             IMapper mapper,
                             IValidator<RegisterInputDto> registerValidator,
                             IValidator<ChangePasswordInputDto> changePasswordValidator,
                             IValidator<LoginByUserNamePasswordInputDto> loginByUserNamePasswordValidator) : base(unitOfWork, user)
        {
            this.loginByUserNamePasswordValidator = loginByUserNamePasswordValidator;
            this.registerValidator = registerValidator;
            this.changePasswordValidator = changePasswordValidator;
            this.jwtOption = jwtOption.Value;
            this._mapper = mapper;
        }

        public async Task<ResultService> ChangePasswordAsync(ChangePasswordInputDto inputDto)
        {
            await changePasswordValidator.ValidateAsync(inputDto);

            var currentUser = await unitOfWork.UserRepository.FindByIdAsync(user.Id ?? Guid.Empty);

            if (currentUser != null)
            {
                currentUser.Password = inputDto.NewPassword.HashPassword();

                await unitOfWork.SaveChangesAsync();

                return new ResultService()
                {
                    StatusCode = "200",
                    Message = "Success"
                };
            }

            return new ResultService()
            {
                StatusCode = "500",
                Message = "Fail"
            };
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

            var user = await unitOfWork.UserRepository.GetsUserByUserNameAsync(inputDto.UserName);

            if (user == null || !AuthenExtention.VerifyPassword(inputDto.Password,user.Password!))
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.NotFound.ToString(),
                    Message = "Wrong UserName or Password"
                };
            }

            string accessToken = GenerateToken(user);

            var ouputDto = new LoginByUserNamePasswordOutputDto()
            {
                AccessToken = accessToken,
                RefreshToken = "adhqdasdhwncqdojaodjqoiwwwwwwjdaosjdwjdoasjdonqjdq",
            };

            SetCookie(accessToken);

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "",
                Datas = ouputDto
            };
        }



        public Task<ResultService> LogoutAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ResultService> RegisterAsync(RegisterInputDto inputDto)
        {
            await registerValidator.ValidateAndThrowAsync(inputDto);

            var user = _mapper.Map<User>(inputDto);

            var hashPassword = AuthenExtention.HashPassword(user.Password!);

            user.Password = hashPassword;

            await unitOfWork.UserRepository.AddAsync(user);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                Message = "Success",
            };
        }

        private string GenerateToken(User user)
        {
            var authClaims = new List<Claim>
            {
                new Claim("Email", user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("FullName", user.FullName!),
                new Claim("UserName", user.UserName!)
            };

            if (user.UserRoles?.Count > 0)
            {
                foreach (var role in user.UserRoles)
                {
                    new Claim("Role", role.Role!.Name!);
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

        private void SetCookie(string accessToken)
        {

        }
    }
}
