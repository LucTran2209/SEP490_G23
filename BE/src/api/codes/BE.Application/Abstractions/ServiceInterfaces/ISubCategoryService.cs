using BE.Application.Common.Results;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface ISubCategoryService
    {
        Task<ResultService> GetAllSubCategoriesAsync();
    }
}
