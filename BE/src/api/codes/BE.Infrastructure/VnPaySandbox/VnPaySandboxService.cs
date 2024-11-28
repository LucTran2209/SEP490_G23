using BE.Infrastructure.VnPaySandbox.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

namespace BE.Infrastructure.VnPaySandbox
{
    public class VnPaySandboxService : IVnPaySandboxService
    {
        public readonly VnpayConfig _vnpayConfig;

        public VnPaySandboxService(IOptions<VnpayConfig> vnpayConfig)
        {
            _vnpayConfig = vnpayConfig.Value;
        }


        public string CreatePaymentUrl(PaymentInformationModel model, HttpContext context)
        {
            var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(_vnpayConfig.TimeZoneId);
            var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);
            var tick = DateTime.Now.Ticks.ToString();
            var pay = new VnPayLibrary();
            var urlCallBack = _vnpayConfig.ReturnUrl;

            pay.AddRequestData("vnp_Version", _vnpayConfig.Version);
            pay.AddRequestData("vnp_Command", _vnpayConfig.Command);
            pay.AddRequestData("vnp_TmnCode", _vnpayConfig.TmnCode);
            pay.AddRequestData("vnp_Amount", ((int)model.Amount*100).ToString());
            pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", _vnpayConfig.CurrCode);
            pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
            pay.AddRequestData("vnp_Locale", _vnpayConfig.Locale);
            pay.AddRequestData("vnp_OrderInfo", $"{model.Name} {model.OrderDescription} {model.Amount}");
            pay.AddRequestData("vnp_OrderType", model.OrderType);
            pay.AddRequestData("vnp_ReturnUrl", urlCallBack);
            pay.AddRequestData("vnp_TxnRef", tick);

            var paymentUrl =
                pay.CreateRequestUrl(_vnpayConfig.BaseUrl, _vnpayConfig.HashSecret);

            return paymentUrl;
        }

        public PaymentResponseModel PaymentExecute(IQueryCollection collection)
        {
            var pay = new VnPayLibrary();

            var response = pay.GetFullResponseData(collection, _vnpayConfig.HashSecret);

            return response;
        }

        
    }
}
