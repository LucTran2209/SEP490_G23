namespace BE.Application.Services.Feedbacks.FeedbackServiceInputDto
{
    public class CreateFeedbackInputDto
    {
        public Guid ProductId { get; set; }
        public string UserName { get; set; } = string.Empty;  
        public decimal Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
