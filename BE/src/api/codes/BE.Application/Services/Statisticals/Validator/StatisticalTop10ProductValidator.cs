using BE.Application.Services.Statisticals.StatisticalServiceInputDto;

namespace BE.Application.Services.Statisticals.Validator
{
    public class StatisticalTop10ProductValidator : AbstractValidator<StatisticalTop10ProductInputDto>
    {
        public StatisticalTop10ProductValidator(IUnitOfWork unitOfWork)
        {
            RuleFor(r => r.RentaiShopId)
                 .NotEmpty().WithMessage("Shop status is required.")
                 .Must(Id => Id != Guid.Empty).WithMessage("RentalShopId cannot be empty Guid.")
               // Kiểm tra Id trong database
               .MustAsync(async (Id, cancellation) =>
               {
                   var user = await unitOfWork.RentalShopRepository.GetRentalShopByIdAsync(Id);
                   return user != null;
               }).WithMessage("RentalShopId does not exist in the database."); ;
        }
    }
}
