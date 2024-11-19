using BE.Infrastructure.VnPaySandbox.Models;
using Microsoft.AspNetCore.Http;

namespace BE.Infrastructure.VnPaySandbox
{
    public interface IVnPaySandboxService
    {
        string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
        PaymentResponseModel PaymentExecute(IQueryCollection query);
    }
}
