using BE.Application.Services.Feedbacks.FeedbackServiceInputDto;
using BE.Application.Services.Feedbacks.FeedbackServiceOutputDto;
using BE.Domain.Entities;

namespace BE.Application.Services.Feedbacks
{
    public static class FeedbackExtension
    {
        public static Feedback ToEntity(this CreateFeedbackInputDto inputDto)
        {
            return new Feedback
            {
                ProductId = inputDto.ProductId,
                UserName = inputDto.UserName,  
                Rating = inputDto.Rating,
                Comment = inputDto.Comment
            };
        }

        public static FeedbackOutputDto ToOutputDto(this Feedback feedback)
        {
            return new FeedbackOutputDto
            {
                Id = feedback.Id,
                ProductId = feedback.ProductId,
                Rating = feedback.Rating,
                Comment = feedback.Comment,
            };
        }

    }
}
