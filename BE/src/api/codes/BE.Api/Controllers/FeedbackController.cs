using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Feedbacks.FeedbackServiceInputDto;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : BaseController
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateFeedback([FromBody] CreateFeedbackInputDto inputDto)
        {
            var result = await _feedbackService.CreateFeedbackAsync(inputDto);
            
            return ReturnFollowStatusCode(result);
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetFeedbacksByProductId(Guid productId)
        {
            var result = await _feedbackService.GetFeedbacksByProductIdAsync(productId);

            return ReturnFollowStatusCode(result);
        }
    }
}