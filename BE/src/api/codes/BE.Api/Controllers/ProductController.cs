using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Products.ProductServiceInputDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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

        [HttpGet("list")]
        public async Task<IActionResult> GetListAsync([FromQuery] GetListProductInputDto inputDto)
        {
            var output = await productService.GetListProductAsync(inputDto);
            return Ok(output);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductByIdAsync(Guid id)
        {
            var output = await productService.GetProductByIdAsync(id);
            if (output.StatusCode == HttpStatusCode.NotFound.ToString())
            {
                return NotFound(output);
            }

            return Ok(output);
        }

        [HttpGet("/rentalshop/{rentalShopId}")]
        public async Task<IActionResult> GetListProductByRentalShopId([FromQuery] GetListProductByRetalShopIdInputDto inputDto, Guid rentalShopId)
        {
            var output = await productService.GetListProductByRentalShopIdAsync(inputDto, rentalShopId);

            if (output.StatusCode == HttpStatusCode.NotFound.ToString())
            {
                return NotFound(output);
            }

            return Ok(output);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromForm] CreateProductInputDto inputDto)
        {
            var output = await productService.CreateAsync(inputDto);
            return Created(output.StatusCode, output);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromForm] UpdateProductInputDto inputDto)
        {
            var output = await productService.UpdateProductAsync(inputDto, id);
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