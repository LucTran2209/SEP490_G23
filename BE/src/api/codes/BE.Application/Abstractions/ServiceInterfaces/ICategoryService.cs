using BE.Application.Common.Results;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface ICategoryService
    {
        Task<ResultService> GetAllCategoriesAsync();
    }
}
