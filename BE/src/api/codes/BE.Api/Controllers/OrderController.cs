﻿using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Orders.OrderServiceInputDto;
using BE.Domain.Interfaces;
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
        private readonly IUser _user;

        public OrderController(ILogger<UserController> logger, IOrderService orderService, IUser user)
        {
            _logger = logger;
            this.orderService = orderService;
            _user = user;
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
        public async Task<IActionResult> GetListMyOrderAsync([FromQuery] GetListMyOrderInputDto inputDto)
        {
            var output = await orderService.GetListMyOrderAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }

        [HttpGet("list")]
        [Authorize]
        public async Task<IActionResult> GetListRentalShopOrderAsync([FromQuery] GetListRentalShopOrderInputDto inputDto)
        {
            var output = await orderService.GetListRentalShopOrderAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }

        [HttpGet("detail/{orderId}")]
        [Authorize]
        public async Task<IActionResult> GetDetailOrderAsync(Guid orderId)
        {
            var output = await orderService.GetDetailOrderAsync(new GetOrderDetailInputDto { OrderId = orderId});

            return ReturnFollowStatusCode(output);
        }
    }
}