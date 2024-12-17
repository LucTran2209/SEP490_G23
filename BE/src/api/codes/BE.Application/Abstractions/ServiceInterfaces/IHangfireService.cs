namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IHangfireService
    {
        Task CheckOverDatePayment();
        Task CheckOverDateRented(string email, Guid orderId);
    }
}
