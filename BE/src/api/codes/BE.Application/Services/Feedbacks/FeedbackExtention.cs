using BE.Application.Services.Feedbacks.FeedbackServiceInputDto;
using BE.Application.Services.Feedbacks.FeedbackServiceOutputDto;

namespace BE.Application.Services.Feedbacks
{
    public static class FeedbackExtension
    {
        public static Feedback ToEntity(this CreateFeedbackInputDto inputDto, string? name)
        {
            return new Feedback
            {
                ProductId = inputDto.ProductId,
                UserName = name,
                Rating = inputDto.Rating,
                Comment = inputDto.Comment
            };
        }

        public static FeedbackOutputDto ToOutputDto(this Feedback feedback, string? ava)
        {
            return new FeedbackOutputDto
            {
                Id = feedback.Id,
                ProductId = feedback.ProductId,
                UserName = feedback.UserName,
                AvatarPersonal = ava,
                Rating = feedback.Rating,
                Comment = feedback.Comment,
            };
        }
    }
}