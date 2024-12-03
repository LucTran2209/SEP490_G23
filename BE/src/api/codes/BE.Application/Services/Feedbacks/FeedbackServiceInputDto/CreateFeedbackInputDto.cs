namespace BE.Application.Services.Feedbacks.FeedbackServiceInputDto
{
    public class CreateFeedbackInputDto
    {
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; } 
        public decimal Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}