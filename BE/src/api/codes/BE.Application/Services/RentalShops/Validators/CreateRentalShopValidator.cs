using BE.Application.Services.RentalShops.RentalShopServiceInputDto;

namespace BE.Application.Services.RentalShops.Validators
{
    public class CreateRentalShopValidator : AbstractValidator<CreateRentalShopInputDto>
    {
        public CreateRentalShopValidator()
        {
            RuleFor(r => r.ShopName)
                .NotEmpty().WithMessage("Shop name is required.")
                .MaximumLength(100).WithMessage("Shop name cannot exceed 100 characters.");

            RuleFor(r => r.PhoneNumber)
                .NotEmpty().WithMessage("Phone number is required.")
                .Matches(@"^\d{10,12}$").WithMessage("Phone number must be between 10-12 digits.");

            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");

            RuleFor(r => r.Address)
                .NotEmpty().WithMessage("Address is required.");
        }
    }
}