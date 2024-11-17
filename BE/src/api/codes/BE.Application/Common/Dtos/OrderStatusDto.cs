using Microsoft.AspNetCore.Http;

namespace BE.Application.Common.Dtos
{
    public class OrderStatusDto
    {
        public Guid? Id { get; set; }
        public Guid OrderId { get; set; }
        public string? Message { get; set; }
        public RequestStatus Status { get; set; }
        public string? FileAttach { get; set; }
    }
}
