using BE.Application.Services.Vouchers.VoucherServiceInputDto;
using FluentValidation;

namespace BE.Application.Services.Vouchers.Validators
{
    public class UpdateVoucherValidator : AbstractValidator<UpdateVoucherInputDto>
    {
        public UpdateVoucherValidator()
        {
            RuleFor(v => v.Code)
                .NotEmpty().WithMessage("Code is required.")
                .MaximumLength(50).WithMessage("Code cannot exceed 50 characters.");

            RuleFor(v => v.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(200).WithMessage("Description cannot exceed 200 characters.");

            RuleFor(v => v.DiscountValue)
                .GreaterThan(0).WithMessage("Discount value must be greater than zero.");

            RuleFor(v => v.StartDate)
                .LessThan(v => v.ExpiryDate).WithMessage("StartDate must be before ExpiryDate.");

            RuleFor(v => v.ExpiryDate)
                .GreaterThan(DateTime.UtcNow).WithMessage("ExpiryDate must be in the future.");
        }
    }
}
