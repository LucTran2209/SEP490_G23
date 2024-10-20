﻿using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Products.ProductServiceInputDto;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IProductService productService;

        public ProductController(ILogger<ProductController> logger, IProductService productService)
        {
            _logger = logger;
            this.productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromForm] CreateProductInputDto inputDto)
        {
            var output = await productService.CreateAsync(inputDto);
            return Created(output.StatusCode, output);
        }

  
        [HttpGet("list")]
        public async Task<IActionResult> GetListAsync([FromQuery] GetListProductInputDto inputDto)
        {
            var output = await productService.GetListProductAsync(inputDto);
            return Ok(output);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromForm] UpdateProductInputDto inputDto)
        {
            var output = await productService.UpdateProductAsync(inputDto,id);
            return Ok(output);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var output = await productService.DeleteProductAsync(id);
            return Ok(output);
        }
    }
}
