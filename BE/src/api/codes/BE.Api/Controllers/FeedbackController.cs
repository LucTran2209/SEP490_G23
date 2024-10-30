using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Feedbacks.FeedbackServiceInputDto;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BE.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
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

            if (result.StatusCode == HttpStatusCode.Created.ToString())
            {
                return Created(string.Empty, result);
            }
            return BadRequest(result);
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetFeedbacksByProductId(Guid productId)
        {
            var result = await _feedbackService.GetFeedbacksByProductIdAsync(productId);

            if (result.StatusCode == HttpStatusCode.OK.ToString())
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}