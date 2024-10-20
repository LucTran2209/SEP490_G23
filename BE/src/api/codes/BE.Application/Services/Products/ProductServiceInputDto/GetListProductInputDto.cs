using BE.Application.Models;

namespace BE.Application.Services.Products.ProductServiceInputDto
{
    public class GetListProductInputDto : PagedResultRequestModel
    {
        public string? ProductName { get; set; }
        public string? Description { get; set; }
    }
}
