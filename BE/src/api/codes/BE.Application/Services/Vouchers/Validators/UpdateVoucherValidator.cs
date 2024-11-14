using BE.Application.Services.Vouchers.VoucherServiceInputDto;
using FluentValidation;

namespace BE.Application.Services.Vouchers.Validators
{
    public class UpdateVoucherValidator : AbstractValidator<UpdateVoucherInputDto>
    {
        public UpdateVoucherValidator()
        {
            RuleFor(v => v.Code)
                .NotEmpty().WithMessage("Voucher code is required.")
                .MaximumLength(50).WithMessage("Voucher code cannot exceed 50 characters.");

            RuleFor(v => v.DiscountType)
                .IsInEnum().WithMessage("Invalid discount type.");

            RuleFor(v => v.DiscountValue)
                .GreaterThan(0).WithMessage("Discount value must be greater than zero.");

            RuleFor(v => v.MinimumSpend)
                .GreaterThanOrEqualTo(0).WithMessage("Minimum spend cannot be negative.")
                .When(v => v.MinimumSpend.HasValue);

            RuleFor(v => v.MaximumDiscount)
                .GreaterThanOrEqualTo(0).WithMessage("Maximum discount cannot be negative.")
                .When(v => v.MaximumDiscount.HasValue);

            RuleFor(v => v.StartDate)
                .LessThan(v => v.ExpiryDate).WithMessage("Start date must be before the expiry date.");

            RuleFor(v => v.ExpiryDate)
                .GreaterThan(v => v.StartDate).WithMessage("Expiry date must be after the start date.");

            RuleFor(v => v.UsageLimit)
                .GreaterThan(0).WithMessage("Usage limit must be greater than zero.")
                .When(v => v.UsageLimit.HasValue);
        }
    }
}
