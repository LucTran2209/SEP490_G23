using BE.Application.Common.Dtos;
using BE.Application.Common.Results;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface ISubCategoryService
    {
        Task<ResultService> GetAllSubCategoriesAsync();
        Task<ResultService> AddCategoryAsync(CategoryDto category);
        Task<ResultService> AddSubCategoryAsync(SubCategoryDto subCategory);

        Task<ResultService> UpdateCategoryAsync(CategoryDto category);
        Task<ResultService> UpdateSubCategoryAsync(SubCategoryDto subCategory);
    }
}
