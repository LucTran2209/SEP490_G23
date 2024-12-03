using BE.Application.Common.Dtos;

namespace BE.Application.Services.SubCategories
{
    public class DetailSubCategoryDto
    {
        public Guid? Id { get; set; }
        public string? SubCategoryName { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public CategoryDto? Category { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<SubCategory, DetailSubCategoryDto>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedDate.DateTime));
            }
        }
    }
}
