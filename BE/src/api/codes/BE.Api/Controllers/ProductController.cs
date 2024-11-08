using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Products.ProductServiceInputDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : BaseController
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

        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetProductByIdAsync(Guid id)
        {
            var output = await productService.GetProductByIdAsync(id);

            return ReturnFollowStatusCode(output);
        }

        [HttpGet("Shop/{rentalShopId}/")]
        public async Task<IActionResult> GetListProductByRentalShopId([FromQuery] GetListProductByRetalShopIdInputDto inputDto, Guid rentalShopId)
        {
            var output = await productService.GetListProductByRentalShopIdAsync(inputDto, rentalShopId);

            return ReturnFollowStatusCode(output);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddAsync([FromForm] CreateProductInputDto inputDto)
        {
            var output = await productService.CreateAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromForm] UpdateProductInputDto inputDto)
        {
            var output = await productService.UpdateProductAsync(inputDto, id);

            return ReturnFollowStatusCode(output);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var output = await productService.DeleteProductAsync(id);

            return ReturnFollowStatusCode(output);
        }
    }
}