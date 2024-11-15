namespace BE.Application.Common.Dtos
{
    public class RentalShopDto
    {
        public Guid? Id { get; set; }
        public Guid UserId { get; set; }
        public string? AvatarShop {  get; set; }
        public string? ShopName { get; set; }
        public string? ImageFont { get; set; }
        public string? ImageBack { get; set; }
        public string? TaxNumber { get; set; }
        public string? BusinessLicenseFile { get; set; }
        public int RentalScale { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public RequestShop Status { get; set; }
        public bool IsActive { get; set; }
        public string? Description { get; set; }
    }
}
