using Microsoft.AspNetCore.Http;

namespace BE.Application.Services.Orders.OrderServiceInputDto
{
    public class CreateOrderStatusInputDto
    {
        public Guid OrderId { get; set; }
        public string? MessageStatus { get; set; }
        public RequestStatus Status { get; set; }
        public IFormFile? FileAttach { get; set; }
    }
}