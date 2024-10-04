using BE.Application.Abstractions;
using BE.Application.Services.Users.UserServiceInputDto;
using BE.Persistence;
using FluentValidation;

namespace BE.Application.Services.Users.Validators
{
    public class CreateUserValidator : ValidatorBase<CreateUserInputDto>
    {
        public CreateUserValidator(ApplicationDbContext context) : base(context)
        {
            RuleFor(u => u.PhoneNumber)
                .NotEmpty().WithMessage("PhoneNumber is requierd")
                .MaximumLength(10).WithMessage("Max length 10");
        }
    }
}
