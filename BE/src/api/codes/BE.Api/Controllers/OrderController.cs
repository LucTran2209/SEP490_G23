using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Orders.OrderServiceInputDto;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IOrderService orderService;

        public OrderController(ILogger<UserController> logger, IOrderService orderService)
        {
            _logger = logger;
            this.orderService = orderService;
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync([FromForm] CreateOrderInputDto inputDto)
        {
            var output = await orderService.CreateAsync(inputDto);
            return Created(output.StatusCode, output);
        }

        [HttpPost("orderstatus")]
        public async Task<IActionResult> AddOrderStatusAsync([FromForm] CreateOrderStatusInputDto inputDto)
        {
            var output = await orderService.CreateOrderStatusAsync(inputDto);
            return Created(output.StatusCode, output);
        }

        [HttpGet]
        public async Task<IActionResult> GetListAsync([FromQuery] GetListOrderByUserInputDto inputDto)
        {
            var output = await orderService.ListOrderAsync(inputDto);
            return Ok(output);
        }
    }
}