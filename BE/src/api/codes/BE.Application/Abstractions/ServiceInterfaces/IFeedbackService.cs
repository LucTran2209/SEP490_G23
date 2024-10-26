using BE.Application.Common.Results;
using BE.Application.Services.Feedbacks.FeedbackServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IFeedbackService
    {
        Task<ResultService> CreateFeedbackAsync(CreateFeedbackInputDto inputDto);
        Task<ResultService> GetFeedbacksByProductIdAsync(Guid productId);
    }
}
