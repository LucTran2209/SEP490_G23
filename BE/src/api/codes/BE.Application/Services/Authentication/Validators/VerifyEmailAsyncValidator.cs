using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Persistence;

namespace BE.Application.Services.Authentication.Validators
{
    public class VerifyEmailAsyncValidator : ValidatorBase<VerifyEmailInputDto>
    {
        public VerifyEmailAsyncValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email required")
                .EmailAddress().WithMessage("Invalid Email")
                .MustAsync(async (email, cancellationToken) =>
                {
                    return !await context.Users.AnyAsync(u => u.Email == email, cancellationToken);
                }).WithMessage("Email đã tồn tại");

            RuleFor(r => r.UserName)
                 .NotEmpty().WithMessage("UserName is required.")
                 .MustAsync(async (email, cancellation) =>
                 {
                     var user = await context.Users.FirstOrDefaultAsync(x => x.Email == email);

                     return user == null;
                 }).WithMessage("UserName đã tồn tại");
        }
    }
}
