using BE.Application.Services.Products.ProductServiceInputDto;
using FluentValidation;

namespace BE.Application.Services.Products.Validators
{
    public class UpdateProductValidator : AbstractValidator<UpdateProductInputDto>
    {
        public UpdateProductValidator()
        {
            RuleFor(p => p.ProductName)
                .NotEmpty().WithMessage("Product name is required.")
                .MaximumLength(100).WithMessage("Product name cannot exceed 100 characters.");

            RuleFor(p => p.Quantity)
                .GreaterThanOrEqualTo(0).WithMessage("Quantity cannot be negative.");

            RuleFor(p => p.RentalPrice)
                .GreaterThan(0).WithMessage("Rental price must be greater than zero.");

            RuleFor(p => p.DepositPrice)
                .GreaterThanOrEqualTo(0).WithMessage("Deposit price cannot be negative.");

            RuleFor(p => p.RentalLimitDays)
                .GreaterThan(0).WithMessage("Rental limit days must be greater than zero.");
        }
    }
}
