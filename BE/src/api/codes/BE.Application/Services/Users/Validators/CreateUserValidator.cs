﻿using BE.Application.Services.Users.UserServiceInputDto;
using BE.Persistence;

namespace BE.Application.Services.Users.Validators
{
    public class CreateUserValidator : ValidatorBase<CreateUserInputDto>
    {
        public CreateUserValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(u => u.UserName)
                .NotEmpty().WithMessage("Address is required");

            RuleFor(u => u.Password)
                .NotEmpty().WithMessage("Address is required");

            RuleFor(u => u.PhoneNumber)
                .NotEmpty().WithMessage("PhoneNumber is requierd")
                .MaximumLength(10).WithMessage("Max length 10");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email required")
                .EmailAddress().WithMessage("Email không hợp lệ")
                .MustAsync(async (email, cancellationToken) =>
                {
                    return !await context.Users.AnyAsync(u => u.Email == email, cancellationToken);
                }).WithMessage("Email đã tồn tại");

            RuleFor(u => u.Address)
                .NotEmpty().WithMessage("Address is required");

            RuleFor(u => u.Gender)
                .NotEmpty().WithMessage("Gender is required");

            RuleFor(u => u.FullName)
                .NotEmpty().WithMessage("FullName is required");

            RuleFor(u => u.DateOfBirth)
                .NotEmpty().WithMessage("Date of Birth is required")
                .WithMessage("Date of Birth must be a valid past date in the format: dd/MM/yyyy");
        }
    }

    public class UpdateUserValidator : ValidatorBase<UpadteUserInputDto>
    {
        public UpdateUserValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(u => u.PhoneNumber)
                .NotEmpty().WithMessage("PhoneNumber is required")
                .MaximumLength(10).WithMessage("Max length is 10");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email required")
                .EmailAddress().WithMessage("Email không hợp lệ");

            RuleFor(u => u.Address)
                .NotEmpty().WithMessage("Address is required");

            RuleFor(u => u.Gender)
                .NotEmpty().WithMessage("Gender is required");

            RuleFor(u => u.FullName)
                .NotEmpty().WithMessage("FullName is required");

            RuleFor(u => u.DateOfBirth)
                .NotEmpty().WithMessage("Date of Birth is required")
                .WithMessage("Date of Birth must be a valid past date in the format: dd/MM/yyyy");
        }
    }

    public class ActiveUserValidator : ValidatorBase<ActiveUserInputDto>
    {
        public ActiveUserValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(u => u.IsActive)
                .NotEmpty().WithMessage("Active is True or False");
        }
    }
}