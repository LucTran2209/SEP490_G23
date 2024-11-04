namespace BE.Application.Services.SubCategories
{
    public class SubCategoryService : BaseService, ISubCategoryService
    {
        public SubCategoryService(IUnitOfWork unitOfWork, IUser user) : base(unitOfWork, user)
        {
        }

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