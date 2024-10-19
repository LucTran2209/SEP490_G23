using BE.Application.Services.Products.ProductServiceInputDto;
using FluentValidation;

namespace BE.Application.Services.Products.Validators
{
    public class CreateProductValidator : AbstractValidator<CreateProductInputDto>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.ProductName)
                .NotEmpty().WithMessage("Product name is required.")
                .MaximumLength(100).WithMessage("Product name cannot exceed 100 characters.");

            RuleFor(p => p.Quantity)
                .GreaterThanOrEqualTo(0).WithMessage("Quantity cannot be negative.");

            RuleFor(p => p.Price)
                .GreaterThan(0).WithMessage("Price must be greater than zero.");
        }
    }
}
