using BE.Application.Services.RentalShops.RentalShopServiceInputDto;

namespace BE.Application.Services.RentalShops.Validators
{
    public class StatusRentalShopValidator : AbstractValidator<ActiveRentalShopInputDto>
    {
        public StatusRentalShopValidator(IUnitOfWork unitOfWork)
        {
            RuleFor(r => r.Id)
                 .NotEmpty().WithMessage("Shop status is required.")
                 .Must(Id => Id != Guid.Empty).WithMessage("RentalShopId cannot be empty Guid.")
               // Kiểm tra Id trong database
               .MustAsync(async (Id, cancellation) =>
               {
                   var user = await unitOfWork.RentalShopRepository.GetRentalShopByIdAsync(Id);
                   return user != null;
               }).WithMessage("RentalShopId does not exist in the database."); ;

            RuleFor(r => r.Status)
                .NotEmpty().WithMessage("Shop status is required.")
                .IsInEnum().WithMessage("Invalid shop status.");
        }
    }
}
