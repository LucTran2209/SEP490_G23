using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.DependencyInjections;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace BE.Application.Services.ExternalServices
{
    public class MailService : IMailService
    {
        private readonly SmtpConfig _smtpConfig;

        public MailService(IOptions<SmtpConfig> smtpConfig)
        {
            _smtpConfig = smtpConfig.Value;
        }

        public async Task SendMailAsync(string? From, string To, string subject, string body)
        {
            SmtpClient emailClient = new SmtpClient(_smtpConfig.SmtpServer, _smtpConfig.Port);
            emailClient.EnableSsl = true;
            emailClient.Credentials = new NetworkCredential(_smtpConfig.Email, _smtpConfig.Password);

            MailMessage message = new MailMessage($"{_smtpConfig.Email}", To);
            message.Subject = subject;
            message.IsBodyHtml = true;
            message.Body = body;

            await emailClient.SendMailAsync(message);
        }
    }
}