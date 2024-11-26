using Microsoft.AspNetCore.Http;

namespace BE.Application.Services.Orders.OrderServiceInputDto
{
    public class CreateOrderStatusInputDto
    {
        public Guid? Id { get; set; }
        public Guid OrderId { get; set; }
        public string? Message { get; set; }
        public RequestStatus Status { get; set; }
        public IFormFile? FileAttach { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<CreateOrderStatusInputDto, OrderStatus>();
            }
        }
    }
}