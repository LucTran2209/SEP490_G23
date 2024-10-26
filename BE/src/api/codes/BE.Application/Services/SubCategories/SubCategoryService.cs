using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BE.Application.Services.SubCategories
{
    public class SubCategoryService : BaseService, ISubCategoryService
    {
        public SubCategoryService(IUnitOfWork unitOfWork, IUser user) : base(unitOfWork, user) { }

        public async Task<ResultService> GetAllSubCategoriesAsync()
        {
            var subCategories = await unitOfWork.SubCategoryRepository.GetAll().ToListAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Subcategories retrieved successfully.",
                Datas = subCategories
            };
        }
    }
}
