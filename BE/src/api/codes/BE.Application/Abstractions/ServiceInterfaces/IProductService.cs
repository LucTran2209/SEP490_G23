using BE.Application.Common.Results;
using BE.Application.Services.Products.ProductServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IProductService
    {
        Task<ResultService> CreateAsync(CreateProductInputDto inputDto);
        Task<ResultService> GetListProductAsync();
        //Task<ResultService> UpdateProductAsync(UpdateProductInputDto inputDto);
        //Task<ResultService> GetProductByIdAsync(FindProductInputDto inputDto);
        Task<ResultService> DeleteProductAsync(Guid productId);
    }
}
