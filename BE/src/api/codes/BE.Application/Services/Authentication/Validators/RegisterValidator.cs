using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Persistence;

namespace BE.Application.Services.Authentication.Validators
{
    public class RegisterValidator : ValidatorBase<RegisterInputDto>
    {
        public RegisterValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email required")
                .EmailAddress().WithMessage("Email không hợp lệ")
                .MustAsync(async (email, cancellationToken) =>
                {
                    return !await context.Users.AnyAsync(u => u.Email == email, cancellationToken);
                }).WithMessage("Email đã tồn tại");

            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("UserName required")
                .MustAsync(async (userName, cancellationToken) =>
                {
                    return !await context.Users.AnyAsync(u => u.UserName == userName, cancellationToken);
                }).WithMessage("UserName has existed");
        }
    }
}