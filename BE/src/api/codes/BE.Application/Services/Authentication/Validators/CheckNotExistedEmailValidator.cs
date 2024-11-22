using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Infrastructure.Common;
using BE.Persistence;

namespace BE.Application.Services.Authentication.Validators
{
    public class CheckNotExistedEmailValidator : ValidatorBase<CheckNotExistedEmailInputDto>
    {
        public CheckNotExistedEmailValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(r => r.Email)
                  .NotEmpty().WithMessage("Email is required.")
                  .EmailAddress().WithMessage("Invalid email format.")
                  .MustAsync(async (email, cancellation) =>
                  {
                      var user = await context.Users.FirstOrDefaultAsync(x => x.Email == email);

                      return user == null;
                  }).WithMessage("Email already exists in the database.");

        }
    }
}
