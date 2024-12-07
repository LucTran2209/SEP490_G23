using BE.Application.Common.Dtos;
using BE.Domain.Entities;

namespace BE.Application.Services.SubCategories
{
    public class SubCategoryService : BaseService, ISubCategoryService
    {
        private readonly IMapper _mapper;

        public SubCategoryService(IUnitOfWork unitOfWork, IUser user, IMapper mapper) : base(unitOfWork, user)
        {
            _mapper = mapper;
        }

        public async Task<ResultService> AddCategoryAsync(CategoryDto category)
        {
            var c = _mapper.Map<Category>(category);

            await unitOfWork.CategoryRepository.AddAsync(c);

            await unitOfWork.SaveChangesAsync();

            return new ResultService()
            {
                StatusCode = (int)HttpStatusCode.OK,
                Datas = c.Id
            };
        }

        public async Task<ResultService> AddSubCategoryAsync(SubCategoryDto subCategory)
        {
            var c = _mapper.Map<SubCategory>(subCategory);

            await unitOfWork.SubCategoryRepository.AddAsync(c);

            await unitOfWork.SaveChangesAsync();

            return new ResultService()
            {
                StatusCode = (int)HttpStatusCode.OK,
                Datas = c.Id
            };
        }

        public async Task<ResultService> GetAllSubCategoriesAsync()
        {
            var subCategories = await unitOfWork.SubCategoryRepository.GetAll().ToListAsync();

            var res = _mapper.Map<List<DetailSubCategoryDto>>(subCategories);

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Subcategories retrieved successfully.",
                Datas = res
            };
        }

        public async Task<ResultService> UpdateCategoryAsync(CategoryDto inputDto)
        {
            var category = await unitOfWork.CategoryRepository.FindByIdAsync((Guid)inputDto.Id!);

            category.CategoryName = inputDto.CategoryName;

            await unitOfWork.CategoryRepository.UpdateAsync(category);

            await unitOfWork.SaveChangesAsync();

            return new ResultService()
            {
                StatusCode = (int)HttpStatusCode.OK
            };
        }

        public async Task<ResultService> UpdateSubCategoryAsync(SubCategoryDto inputDto)
        {
            var subCategory = await unitOfWork.SubCategoryRepository.FindByIdAsync((Guid)inputDto.Id!);

            subCategory.SubCategoryName = inputDto.SubCategoryName;
            subCategory.Description = inputDto.Description;

            await unitOfWork.SubCategoryRepository.UpdateAsync(subCategory);

            await unitOfWork.SaveChangesAsync();

            return new ResultService()
            {
                StatusCode = (int)HttpStatusCode.OK
            };
        }
    }
}