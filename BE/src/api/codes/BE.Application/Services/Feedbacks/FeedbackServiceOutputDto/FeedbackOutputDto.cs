using BE.Application.Common.Dtos;

namespace BE.Application.Services.Feedbacks.FeedbackServiceOutputDto
{
    public class FeedbackOutputDto : FeedbackDto
    {
        public Guid ProductId { get; set; }
        public List<UserDto>? Users { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<Feedback, FeedbackOutputDto>()
                    .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.Product.RentalShop.User.AvatarPersonal));
            }
        }
    }
}