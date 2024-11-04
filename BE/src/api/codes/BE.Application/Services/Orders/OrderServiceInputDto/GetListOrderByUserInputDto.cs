using BE.Application.Models;

namespace BE.Application.Services.Orders.OrderServiceInputDto
{
    public class GetListOrderByUserInputDto : PagedResultRequestModel
    {
        public Guid UserId { get; set; }
        public string? Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid OrderId { get; set; }
        public Guid RentalShopId { get; set; }
        public Guid ProductId { get; set; }
        public Guid OrderStatuts { get; set; }
    }
}