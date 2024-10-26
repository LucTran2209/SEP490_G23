using BE.Application.Services.Feedbacks.FeedbackServiceInputDto;
using FluentValidation;

namespace BE.Application.Services.Feedbacks.Validators
{
    public class CreateFeedbackValidator : AbstractValidator<CreateFeedbackInputDto>
    {
        public CreateFeedbackValidator()
        {
            RuleFor(f => f.ProductId).NotEmpty().WithMessage("ProductId is required.");
            RuleFor(f => f.Rating).InclusiveBetween(1, 5).WithMessage("Rating must be between 1 and 5.");
            RuleFor(f => f.Comment)
                .NotEmpty().WithMessage("Comment is required.")
                .MaximumLength(500).WithMessage("Comment cannot exceed 500 characters.");
        }
    }
}
