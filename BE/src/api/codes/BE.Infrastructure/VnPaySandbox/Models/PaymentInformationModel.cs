namespace BE.Infrastructure.VnPaySandbox.Models
{
    public class PaymentInformationModel
    {
        public string? OrderType { get; set; } = "Nap Tien";
        public double Amount { get; set; }
        public string? OrderDescription { get; set; } = "Nap Tien";
        public string? Name { get; set; }
    }
}
