using BE.Application.Services.Feedbacks.FeedbackServiceInputDto;
using BE.Application.Services.Feedbacks.FeedbackServiceOutputDto;
using BE.Application.Services.Users;

namespace BE.Application.Services.Feedbacks
{
    public class FeedbackService : BaseService, IFeedbackService
    {
        private readonly IValidator<CreateFeedbackInputDto> createFeedbackValidator;
        private readonly IAzureService _azureService;
        private readonly IMapper _mapper;

        public FeedbackService(
            IUnitOfWork unitOfWork,
            IUser user,
            IAzureService azureService,
            IMapper mapper,
            IValidator<CreateFeedbackInputDto> createFeedbackValidator)
            : base(unitOfWork, user)
        {
            this.createFeedbackValidator = createFeedbackValidator;
            _mapper = mapper;
            _azureService = azureService;
        }

        public async Task<ResultService> CreateFeedbackAsync(CreateFeedbackInputDto inputDto)
        {
            await createFeedbackValidator.ValidateAndThrowAsync(inputDto);

            var user = await unitOfWork.UserRepository.GetsUserByUserIDAsync(inputDto.UserId);

            var feedback = FeedbackExtension.ToEntity(inputDto, user.UserName);
            await unitOfWork.FeedbackRepository.AddAsync(feedback);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.Created,
                Message = "Feedback created successfully."
            };
        }

        public async Task<ResultService> GetFeedbacksByProductIdAsync(Guid productId)
        {

            var feedbacks = await unitOfWork.FeedbackRepository.GetAll()
                .Where(f => f.ProductId == productId)
                .ToListAsync();

            var feedback = _mapper.Map<List<FeedbackOutputDto>>(feedbacks);


            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Feedbacks retrieved successfully.",
                Datas = feedback
            };


        }
    }
}