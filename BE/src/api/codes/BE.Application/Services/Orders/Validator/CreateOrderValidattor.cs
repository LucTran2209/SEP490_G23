using BE.Application.Services.Order.OrderServiceInputDto;
using FluentValidation;

namespace BE.Application.Services.Order.Validator
{
    public class CreateOrderValidattor : AbstractValidator<CreateOrderInputDto>
    {
        public CreateOrderValidattor()
        {
            RuleFor(o => o.UserId)
                .NotEmpty().WithMessage("UserId is required")
                .Must(userId => userId != Guid.Empty).WithMessage("UserId cannot be empty Guid");

            RuleFor(o => o.Address)
                .NotEmpty().WithMessage("Address is required");

            // Kiểm tra ngày bắt đầu (StartDate) phải là ngày hiện tại hoặc sau đó
            RuleFor(o => o.StartDate)
                .GreaterThanOrEqualTo(DateTime.Now).WithMessage("StartDate must be today or a future date");

            // Kiểm tra EndDate phải sau StartDate
            RuleFor(o => o.EndDate)
                .GreaterThan(o => o.StartDate).WithMessage("EndDate must be greater than StartDate");

            // Kiểm tra danh sách DetailProducts không được để trống và mỗi sản phẩm phải hợp lệ
            RuleFor(o => o.DetailProducts)
                .NotEmpty().WithMessage("DetailProducts is required")
                .Must(products => products != null && products.Any()).WithMessage("DetailProducts cannot be empty");

            // Kiểm tra từng sản phẩm trong DetailProducts
            RuleForEach(o => o.DetailProducts).ChildRules(products =>
            {
                // Kiểm tra ProductId không được là Guid.Empty
                products.RuleFor(p => p.ProductId)
                    .NotEmpty().WithMessage("ProductId is required")
                    .Must(productId => productId != Guid.Empty).WithMessage("ProductId cannot be empty Guid");

                // Kiểm tra số lượng (Quantity) phải lớn hơn 0
                products.RuleFor(p => p.Quantity)
                    .GreaterThan(0).WithMessage("Quantity must be greater than 0");
            });

            // Kiểm tra trường Note (nếu có)
            RuleFor(o => o.Note)
                .MaximumLength(500).WithMessage("Note cannot exceed 500 characters");

        }
    }
}
