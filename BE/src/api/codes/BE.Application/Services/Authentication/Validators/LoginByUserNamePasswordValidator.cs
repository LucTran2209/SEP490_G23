using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Persistence;

namespace BE.Application.Services.Authentication.Validators
{
    public class LoginByUserNamePasswordValidator : ValidatorBase<LoginByUserNamePasswordInputDto>
    {
        public LoginByUserNamePasswordValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .WithMessage("UserName is required");               

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Password is required");
        }
    }
}