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
        }
    }
}