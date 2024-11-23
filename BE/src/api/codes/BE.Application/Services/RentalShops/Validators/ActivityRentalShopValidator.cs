using BE.Application.Services.RentalShops.RentalShopServiceInputDto;

namespace BE.Application.Services.RentalShops.Validators
{
    public class ActivityRentalShopValidator : AbstractValidator<ActivityRentalShopInputDto>
    {
        public ActivityRentalShopValidator(IUnitOfWork unitOfWork)
        {
            RuleFor(r => r.Id)
                 .NotEmpty().WithMessage("Shop status is required.")
                 .Must(Id => Id != Guid.Empty).WithMessage("RentalShopId cannot be empty Guid.")
               // Kiểm tra Id trong database
               .MustAsync(async (Id, cancellation) =>
               {
                   var user = await unitOfWork.RentalShopRepository.FindByIdAsync(Id);
                   return user != null;
               }).WithMessage("RentalShopId does not exist in the database."); ;

            RuleFor(r => r.IsActive)
                .NotEmpty().WithMessage("Shop active is required.");
        }
    }
}
