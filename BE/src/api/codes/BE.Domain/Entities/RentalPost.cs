using BE.Domain.Abstractions;
using BE.Domain.Abstractions.Enums;

namespace BE.Domain.Entities
{
    public class RentalPost : EntityAuditBase
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Address { get; set; }
        public decimal? RentPrice { get; set; }
        public PostStatus Status { get; set; }
        public Guid? ProductId { get; set; }
            
        public virtual Product? Product { get; set; }
        public virtual ICollection<RentalContract>? RentalContracts { get; set; }
    }
}
