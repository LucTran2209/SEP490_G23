using BE.Application.Models;

namespace BE.Application.Services.Products.ProductServiceInputDto
{
    public class GetListProductInputDto : PagedResultRequestModel
    {
        public string? Address { get; set; }
    }
}