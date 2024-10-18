namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IMailService
    {
        Task SendMailAsync(string? From, string To, string subject, string body);
    }
}
