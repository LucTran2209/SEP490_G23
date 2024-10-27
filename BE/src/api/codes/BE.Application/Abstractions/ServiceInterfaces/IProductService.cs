using BE.Application.Common.Results;
using BE.Application.Services.Products.ProductServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IProductService
    {
        Task<ResultService> CreateAsync(CreateProductInputDto inputDto);
        Task<ResultService> GetListProductAsync(GetListProductInputDto inputDto);
        Task<ResultService> UpdateProductAsync(UpdateProductInputDto inputDto, Guid id);
        Task<ResultService> DeleteProductAsync(Guid productId);
        Task<ResultService> GetProductByIdAsync(Guid productId);
    }
}
