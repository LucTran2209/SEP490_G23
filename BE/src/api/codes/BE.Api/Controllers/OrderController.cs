using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Orders.OrderServiceInputDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : BaseController
    {
        private readonly ILogger<UserController> _logger;
        private readonly IOrderService orderService;

        public OrderController(ILogger<UserController> logger, IOrderService orderService)
        {
            _logger = logger;
            this.orderService = orderService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddAsync([FromForm] CreateOrderInputDto inputDto)
        {
            var output = await orderService.CreateAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }

        [HttpPost("orderstatus")]
        [Authorize]
        public async Task<IActionResult> AddOrderStatusAsync([FromForm] CreateOrderStatusInputDto inputDto)
        {
            var output = await orderService.CreateOrderStatusAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetListAsync([FromQuery] GetListOrderByUserInputDto inputDto)
        {
            var output = await orderService.ListOrderAsync(inputDto);
            return Ok(output);
        }

        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetListMyOrder([FromQuery] GetListMyOrderInputDto inputDto)
        {
            var output = await orderService.GetListMyOrderAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }
    }
}