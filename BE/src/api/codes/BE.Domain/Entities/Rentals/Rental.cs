using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Entities.Products;
using BE.Domain.Entities.RentalRequests;
using BE.Domain.Entities.Users;

namespace BE.Domain.Entities.Rentals
{
    public class Rental : EntityAuditBase, IEntityBase<Guid>
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Address { get; set; } = null!;
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public decimal? Price { get; set; }
        public string Status { get; set; } = null!;
        public string AccessArea { get; set; } = null!;
        public virtual User? User { get; set; }
        public virtual Product? Product { get; set; }
        public virtual ICollection<RentalRequest>? RentalRequests { get; set; }
    }

    public class AccessArea
    {
        List<Guid>? GroupIds { get; set; }
    }
}