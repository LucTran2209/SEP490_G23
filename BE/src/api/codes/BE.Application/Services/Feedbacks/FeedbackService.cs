using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Feedbacks.FeedbackServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BE.Application.Services.Feedbacks
{
    public class FeedbackService : BaseService, IFeedbackService
    {
        private readonly IValidator<CreateFeedbackInputDto> createFeedbackValidator;
        private readonly IAzureService _azureService;

        public FeedbackService(
            IUnitOfWork unitOfWork, 
            IUser user,
            IAzureService azureService,
            IValidator<CreateFeedbackInputDto> createFeedbackValidator) 
            : base(unitOfWork, user)
        {
            this.createFeedbackValidator = createFeedbackValidator;
            _azureService = azureService;
        }

        public async Task<ResultService> CreateFeedbackAsync(CreateFeedbackInputDto inputDto)
        {
            await createFeedbackValidator.ValidateAndThrowAsync(inputDto);

            var feedback = inputDto.ToEntity();
            await unitOfWork.FeedbackRepository.AddAsync(feedback);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "Feedback created successfully."
            };
        }

        public async Task<ResultService> GetFeedbacksByProductIdAsync(Guid productId)
        {
            var feedbacks = await unitOfWork.FeedbackRepository.GetAll()
                .Where(f => f.ProductId == productId)
                .Select(f => f.ToOutputDto())
                .ToListAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Feedbacks retrieved successfully.",
                Datas = feedbacks
            };
        }
    }
}
