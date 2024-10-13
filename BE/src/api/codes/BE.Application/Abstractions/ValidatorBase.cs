using BE.Domain.Interfaces;
using BE.Persistence;
using FluentValidation;
using FluentValidation.Results;
using System.Security.Claims;

namespace BE.Application.Abstractions;

public abstract class ValidatorBase<T> : AbstractValidator<T> where T : class
{
    protected readonly ApplicationDbContext Context;
    protected readonly IUser User;

    public ValidatorBase(ApplicationDbContext context, IUser user)
    {
        Context = context;
        this.User = user;
    }

    protected override void RaiseValidationException(ValidationContext<T> context, ValidationResult result)
    {
        throw new ValidationException(result.Errors);
    }
}

