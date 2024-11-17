using BE.Application.Services.RentalShops.RentalShopServiceInputDto;

namespace BE.Application.Services.RentalShops.Validators
{
    public class UpdateRentalShopValidator : AbstractValidator<UpdateRentalShopInputDto>
    {
        public UpdateRentalShopValidator()
        {
            RuleFor(r => r.ShopName)
                .NotEmpty().WithMessage("Shop name is required.")
                .MaximumLength(100).WithMessage("Shop name cannot exceed 100 characters.");

            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");

            RuleFor(r => r.PhoneNumber)
                .Matches(@"^\d{10,11}$").WithMessage("Phone number must contain 10-11 digits.");

            RuleFor(r => r.Address)
                .NotEmpty().WithMessage("Address is required.");
        }
    }
}