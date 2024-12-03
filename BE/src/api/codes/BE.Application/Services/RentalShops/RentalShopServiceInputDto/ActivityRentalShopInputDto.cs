namespace BE.Application.Services.RentalShops.RentalShopServiceInputDto
{
    public class ActivityRentalShopInputDto
    {
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
        public string? AdminNote { get; set; }
    }
}
