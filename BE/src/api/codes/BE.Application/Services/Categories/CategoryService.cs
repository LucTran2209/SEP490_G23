namespace BE.Application.Services.Categories
{
    public class CategoryService : BaseService, ICategoryService
    {
        public CategoryService(IUnitOfWork unitOfWork, IUser user) : base(unitOfWork, user)
        {
        }

        public async Task<ResultService> GetAllCategoriesAsync()
        {
            var categories = await unitOfWork.CategoryRepository.GetAll()
                .Select(c => new
                {
                    c.Id,
                    c.CategoryName,
                    SubCategories = c.SubCategories.Select(sc => new
                    {
                        sc.Id,
                        sc.SubCategoryName
                    })
                })
                .ToListAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Categories retrieved successfully.",
                Datas = categories
            };
        }
    }
}