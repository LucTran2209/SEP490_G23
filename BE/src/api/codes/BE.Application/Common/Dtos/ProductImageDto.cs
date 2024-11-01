namespace BE.Application.Common.Dtos
{
    public class ProductImageDto
    {
        public Guid? Id { get; set; }
        public Guid? ProductId { get; set; }
        public string? Link { get; set; }
    }
}
