using BE.Application.Services.Wallets.WalletServiceInputDto;
using BE.Persistence;

namespace BE.Application.Services.Wallets.Validators
{
    public class DepoitMoneyValidator : ValidatorBase<DepoitMoneyInputDto>
    {
        public DepoitMoneyValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(x => x.DepoitAmount)
                .NotEmpty().WithMessage("Depoit Money is required")
                .LessThanOrEqualTo((decimal)user.Balance!).WithMessage("Not Enough Balance");
        }
    }
}
