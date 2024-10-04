using BE.Persistence;
using FluentValidation;
using FluentValidation.Results;

namespace BE.Application.Abstractions;

public abstract class ValidatorBase<T> : AbstractValidator<T> where T : class
{
    protected readonly ApplicationDbContext Context;
    //protected readonly ClaimsPrincipal User;

    public ValidatorBase(ApplicationDbContext context)
    {
        Context = context;
        // this.User = principal;
    }

    protected override void RaiseValidationException(ValidationContext<T> context, ValidationResult result)
    {
        throw new ValidationException(result.Errors);
    }
}

