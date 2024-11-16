using BE.Application.Services.Authentication.AuthenServiceInputDto;

namespace BE.Application.Services.Authentication.Validators
{
    public class VerifyEmailAsyncValidator : AbstractValidator<VerifyEmailInputDto>
    {
        public VerifyEmailAsyncValidator(IUnitOfWork unitOfWork)
        {
            RuleFor(r => r.Email)
                .NotEmpty().WithMessage("Email is required.") // Kiểm tra không được để trống
                .EmailAddress().WithMessage("Invalid email format.") // Kiểm tra định dạng email
                .MustAsync(async (email, cancellation) =>
                    {
                        var user = await unitOfWork.UserRepository.GetsUserByUserEmailAsync(email);
                        return user == null; // Return true nếu email chưa tồn tại
                    }).WithMessage("Email already exists in the database."); // Thông báo nếu email đã tồn tại
        }
    }
}
