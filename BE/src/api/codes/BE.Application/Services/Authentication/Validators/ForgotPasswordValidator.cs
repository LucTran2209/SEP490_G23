using BE.Application.Abstractions;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Domain.Interfaces;
using BE.Persistence;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BE.Application.Services.Authentication.Validators
{
    public class ForgotPasswordValidator : ValidatorBase<ForgotPasswordInputDto>
    {
        public ForgotPasswordValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(input => input.Email)
                .NotEmpty().WithMessage("Email is required")
                .MustAsync(async (email, CancellationToken) =>
                {
                    return await context.Users.AnyAsync(u => u.Email == email);
                }).WithMessage("Email has not existed");
        }
    }
}
