namespace BE.Application.Services.Feedbacks.FeedbackServiceOutputDto
{
    public class FeedbackOutputDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public decimal Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public DateTimeOffset CreatedDate { get; set; }
    }
}
