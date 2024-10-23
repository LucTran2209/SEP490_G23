using BE.Application.Services.Order.OrderServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using FluentValidation;

namespace BE.Application.Services.Order.Validator
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

            RuleFor(o => o.Address)
                .NotEmpty().WithMessage("Address is required.");

            RuleFor(o => o.StartDate)
                .GreaterThanOrEqualTo(DateTime.Now.Date).WithMessage("StartDate must be today or a future date.");

            RuleFor(o => o.EndDate)
                .GreaterThan(o => o.StartDate).WithMessage("EndDate must be greater than StartDate.");

            RuleFor(o => o.DetailProducts)
                .NotNull().WithMessage("DetailProducts is required.")
                .NotEmpty().WithMessage("DetailProducts cannot be empty.");

            // Kiểm tra từng sản phẩm trong DetailProducts
            RuleForEach(o => o.DetailProducts).ChildRules(products =>
            {
                // Kiểm tra ProductId không được là Guid.Empty
                products.RuleFor(p => p.ProductId)
                    .NotEmpty().WithMessage("ProductId is required.")
                    .Must(productId => productId != Guid.Empty).WithMessage("ProductId cannot be empty Guid.")
                    // Kiểm tra ProductId trong database
                    .MustAsync(async (productId, cancellation) =>
                    {
                        var product = await unitOfWork.ProductRepository.FindByIdAsync(productId);
                        return product != null;
                    }).WithMessage("ProductId does not exist in the database.");

                // Kiểm tra số lượng (Quantity) phải lớn hơn 0
                products.RuleFor(p => p.Quantity)
                    .GreaterThan(0).WithMessage("Quantity must be greater than 0.");
            });

            RuleFor(o => o.Note)
                .MaximumLength(500).WithMessage("Note cannot exceed 500 characters.");
        }
    }
}
