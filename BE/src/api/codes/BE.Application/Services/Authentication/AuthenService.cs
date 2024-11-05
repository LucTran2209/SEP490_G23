using BE.Application.DependencyInjections;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Application.Services.Authentication.AuthenServiceOutputDto;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BE.Application.Services.Authentication
{
    public class AuthenService : BaseService, IAuthenticationService
    {
        private readonly IValidator<LoginByUserNamePasswordInputDto> loginByUserNamePasswordValidator;
        private readonly IValidator<RegisterInputDto> registerValidator;
        private readonly IValidator<ChangePasswordInputDto> changePasswordValidator;
        private readonly IValidator<ForgotPasswordInputDto> forgotPasswordValidator;
        private readonly JwtOption jwtOption;
        private readonly SystemConfig systemConfig;
        private readonly IMailService mailService;
        private readonly IMapper _mapper;

        public AuthenService(IUnitOfWork unitOfWork,
                             IUser user,
                             IOptions<JwtOption> jwtOption,
                             IOptions<SystemConfig> systemConfig,
                             IMailService mailService,
                             IMapper mapper,
                             IValidator<RegisterInputDto> registerValidator,
                             IValidator<ChangePasswordInputDto> changePasswordValidator,
                             IValidator<ForgotPasswordInputDto> forgotPasswordValidator,
        IValidator<LoginByUserNamePasswordInputDto> loginByUserNamePasswordValidator) : base(unitOfWork, user)
        {
            this.loginByUserNamePasswordValidator = loginByUserNamePasswordValidator;
            this.registerValidator = registerValidator;
            this.changePasswordValidator = changePasswordValidator;
            this.forgotPasswordValidator = forgotPasswordValidator;
            this.mailService = mailService;
            this.jwtOption = jwtOption.Value;
            this.systemConfig = systemConfig.Value;
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

        public async Task<ResultService> ForgotPasswordAsync(ForgotPasswordInputDto inputDto)
        {
            await forgotPasswordValidator.ValidateAsync(inputDto);

            var user = await unitOfWork.UserRepository.GetsUserByUserEmailAsync(inputDto.Email);

            await SendMailAsync(user!);

            return new ResultService();
        }

        public async Task<ResultService> LoginByUserNamePasswordAsync(LoginByUserNamePasswordInputDto inputDto)
        {
            await loginByUserNamePasswordValidator.ValidateAndThrowAsync(inputDto);

            var user = await unitOfWork.UserRepository.GetsUserByUserNameAsync(inputDto.UserName);

            if (user == null || !AuthenExtention.VerifyPassword(inputDto.Password, user.Password!))
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

            var userRoles = new List<UserRole>();
            userRoles.Add(new UserRole() { UserId = user.Id, RoleId = Guid.Parse("dae936b7-3505-4c7e-813a-9221e658be61") });

            user.UserRoles = userRoles;

            await unitOfWork.UserRepository.AddAsync(user);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                Message = "Success",
            };
        }

        public async Task<ResultService> ResetPassword(ResetPasswordInputDto inputDto)
        {
            var user = await unitOfWork.UserRepository.GetsUserByUserEmailAsync(inputDto.Email!);

            if (IsTokenExpired(inputDto.Token!))
            {
                return new ResultService()
                {
                    StatusCode = "400",
                    Message = "Token was expired"
                };
            }

            user!.Password = AuthenExtention.HashPassword(inputDto.NewPassword!);

            await unitOfWork.UserRepository.UpdateAsync(user);

            await unitOfWork.SaveChangesAsync();

            return new ResultService()
            {
                StatusCode = "200"
            };
        }

        public bool IsTokenExpired(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                if (tokenHandler.CanReadToken(token))
                {
                    var jwtToken = tokenHandler.ReadJwtToken(token);

                    var expClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp);
                    if (expClaim != null)
                    {
                        var expUnix = long.Parse(expClaim.Value);
                        var expirationDate = DateTimeOffset.FromUnixTimeSeconds(expUnix).UtcDateTime;

                        return expirationDate < DateTime.UtcNow;
                    }
                }
                return true;
            }
            catch (Exception)
            {
                return true;
            }
        }

        private string GenerateToken(User user)
        {
            var authClaims = new List<Claim>
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim("Email", user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("FullName", user.FullName!),
                new Claim("UserName", user.UserName!),
                new Claim("Avatar", user.AvatarPersonal ?? string.Empty),
            };

            if (user.UserRoles?.Count > 0)
            {
                foreach (var role in user.UserRoles)
                {
                    authClaims.Add(new Claim("Role", role.Role!.Name!));
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

        private async Task SendMailAsync(User user)
        {
            string subject = "ERMS Forgot Password";

            var htmlContent = await File.ReadAllTextAsync("../BE.Api/wwwroot/templates/email/ForgotPassword.html");

            var token = GenerateToken(user);

            var url = $"{systemConfig.BasePath}/{systemConfig.ForgotPasswordUrl}/{token}/{user.Email}";

            var body = htmlContent.Replace("{{url}}", url);

            await mailService.SendMailAsync(null, user.Email!, subject, body);
        }
        private async Task VerifyMailAsync(VerifyEmailInputDto Email, string code)
        {
            string subject = "ERMS Verify Code";

            await mailService.SendMailAsync(null, Email.Email, subject, code);
        }
        public async Task<ResultService> VerifyEmailAsync(VerifyEmailInputDto inputDto)
        {
            var code = new string(Enumerable.Repeat("0123456789", 4)
                            .Select(s => s[new Random().Next(s.Length)]).ToArray());
            await VerifyMailAsync(inputDto, code);
            var v = new ComfirmVerifyEmailOutputDto();
            v.Code = code;
            v.Email = inputDto.Email;
            return new ResultService()
            {
                StatusCode = "200",
                Message = "Send code to email success!",
                Datas = v
            };
        }
        public async Task<ResultService> ComfirmVerifyEmailAsync(ComfirmVerifyEmailInputDto inputDto)
        {
            if (inputDto.Code != inputDto.UserComfirmCode)
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.BadRequest.ToString(),
                    Message = "Wrong to comfirm code"
                };
            }
            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success"
            };
        }
    }
}