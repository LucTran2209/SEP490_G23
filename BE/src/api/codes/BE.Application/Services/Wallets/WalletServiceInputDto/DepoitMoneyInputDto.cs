namespace BE.Application.Services.Wallets.WalletServiceInputDto
{
    public class DepoitMoneyInputDto
    {
        public Guid OrderId { get; set; }
        public Guid RentalShopId { get; set; }
        public decimal DepoitAmount { get; set; }
    }
}
