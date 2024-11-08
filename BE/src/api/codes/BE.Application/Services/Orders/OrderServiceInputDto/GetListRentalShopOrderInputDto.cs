using BE.Application.Models;

namespace BE.Application.Services.Orders.OrderServiceInputDto
{
    public class GetListRentalShopOrderInputDto : PagedResultRequestModel
    {
        public string? OrderCode { get; set; }
        public RequestStatus? Status { get; set; }
        public string? RenterName { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
