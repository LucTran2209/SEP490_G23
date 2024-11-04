using BE.Application.Services.Orders.OrderServiceInputDto;

namespace BE.Application.Services.Orders.Validator
{
    public class CreateOrderValidattor : AbstractValidator<CreateOrderInputDto>
    {
        public CreateOrderValidattor(IUnitOfWork unitOfWork)
        {
            RuleFor(o => o.UserId)
               .NotEmpty().WithMessage("UserId is required.")
               .Must(userId => userId != Guid.Empty).WithMessage("UserId cannot be empty Guid.")
               // Kiểm tra UserId trong database
               .MustAsync(async (userId, cancellation) =>
               {
                   var user = await unitOfWork.UserRepository.GetsUserByUserIDAsync(userId);
                   return user != null;
               }).WithMessage("UserId does not exist in the database.");

            RuleFor(o => o.RecipientAddress)
                .NotEmpty().WithMessage("Address is required.");

            RuleFor(o => o.StartDate)
                .GreaterThanOrEqualTo(DateTime.Now.Date).WithMessage("StartDate must be today or a future date.");

            RuleFor(o => o.EndDate)
                .GreaterThan(o => o.StartDate).WithMessage("EndDate must be greater than StartDate.");

            RuleFor(o => o.Note)
                .MaximumLength(500).WithMessage("Note cannot exceed 500 characters.");
        }
    }
}