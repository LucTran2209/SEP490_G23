using BE.Application.Models;

namespace BE.Application.Services.Products.ProductServiceInputDto
{
    public class GetListProductInputDto : PagedResultRequestModel
    {
        public IEnumerable<string>? Addresses { get; set; }
        public IEnumerable<Guid>? SubCategory { get; set; }
    }
}