using BE.Application.Abstractions;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Domain.Interfaces;
using BE.Persistence;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BE.Application.Services.Authentication.Validators
{
    public class ChangePasswordValidator : ValidatorBase<ChangePasswordInputDto>
    {
        public ChangePasswordValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(c => c.CurrentPassword)
                .NotEmpty().WithMessage("Password requried")
                .MustAsync(async (password, cancellationToken) =>
                {
                    var currentUser = await context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);

                    if (currentUser == null)  return false; 

                    bool isCorrectPass =  AuthenExtention.VerifyPassword(password, currentUser.Password!);

                    return isCorrectPass;
                }).WithMessage("Current Password is not correct!");
        }
    }
}
