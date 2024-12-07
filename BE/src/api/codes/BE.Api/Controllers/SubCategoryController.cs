using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubCategoryController : BaseController
    {
        private readonly ISubCategoryService _subCategoryService;

        public SubCategoryController(ISubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSubCategories()
        {
            var result = await _subCategoryService.GetAllSubCategoriesAsync();

            return ReturnFollowStatusCode(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddSubCategoy([FromBody] SubCategoryDto subCategory)
        {
            var result = await _subCategoryService.AddSubCategoryAsync(subCategory);

            return ReturnFollowStatusCode(result);
        }

        [HttpPost("category")]
        public async Task<IActionResult> AddCategoy([FromBody] CategoryDto category)
        {
            var result = await _subCategoryService.AddCategoryAsync(category);

            return ReturnFollowStatusCode(result);
        }

        [HttpPut("category")]
        public async Task<IActionResult> UpdateCategoy([FromBody] CategoryDto category)
        {
            var result = await _subCategoryService.UpdateCategoryAsync(category);

            return ReturnFollowStatusCode(result);
        }

        [HttpPut("subcategory")]
        public async Task<IActionResult> UpdateSubCategoy([FromBody] SubCategoryDto subCategory)
        {
            var result = await _subCategoryService.UpdateSubCategoryAsync(subCategory);

            return ReturnFollowStatusCode(result);
        }
    }
}