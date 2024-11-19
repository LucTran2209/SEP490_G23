using BE.Infrastructure.VnPaySandbox.Models;

namespace BE.Application.Services.Wallets.WalletServiceInputDto
{
    public class RechargeMoneyInputDto
    {
        public double Amount { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<RechargeMoneyInputDto, PaymentInformationModel>();
            }
        }
    }
}
