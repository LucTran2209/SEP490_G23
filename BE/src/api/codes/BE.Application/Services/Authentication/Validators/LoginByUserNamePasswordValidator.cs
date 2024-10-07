using BE.Application.Abstractions;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Persistence;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BE.Application.Services.Authentication.Validators
{
    public class LoginByUserNamePasswordValidator : ValidatorBase<LoginByUserNamePasswordInputDto>
    {
        public LoginByUserNamePasswordValidator(ApplicationDbContext context) : base(context)
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .WithMessage("UserName is required")
                .MustAsync( async(userName, cancellationToken) =>
                {
                    return await context.Users.AnyAsync(x => x.UserName == userName);           
                })
                .WithMessage("UserName has not exist!");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Password is required");         
        }
    }
}
