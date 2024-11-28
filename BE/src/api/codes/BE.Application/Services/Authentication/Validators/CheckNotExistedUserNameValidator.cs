using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Persistence;

namespace BE.Application.Services.Authentication.Validators
{
    public class CheckNotExistedUserNameValidator : ValidatorBase<CheckNotExistedUserNameInputDto>
    {
        public CheckNotExistedUserNameValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(r => r.UserName)
                  .NotEmpty().WithMessage("UserName is required.")
                  .EmailAddress().WithMessage("Invalid email format.")
                  .MustAsync(async (email, cancellation) =>
                  {
                      var user = await context.Users.FirstOrDefaultAsync(x => x.Email == email);

                      return user == null;
                  }).WithMessage("UserName already exists in the database.");
        }
    }
}
