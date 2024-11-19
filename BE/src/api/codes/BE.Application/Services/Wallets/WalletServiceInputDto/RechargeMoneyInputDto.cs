using BE.Infrastructure.VnPaySandbox.Models;

namespace BE.Application.Services.Wallets.WalletServiceInputDto
{
    public class RechargeMoneyInputDto
    {
        //public string? OrderType { get; set; }
        public double Amount { get; set; }
        //public string? OrderDescription { get; set; }
        //public string? Name { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<RechargeMoneyInputDto, PaymentInformationModel>();
            }
        }
    }
}
