using BE.Application.Models;

namespace BE.Application.Services.Orders.OrderServiceInputDto
{
    public class GetListMyOrderInputDto : PagedResultRequestModel
    {
        public int NearDays {  get; set; }
    }
}
