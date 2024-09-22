﻿using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Entities.Rentals;
using BE.Domain.Entities.Users;

namespace BE.Domain.Entities.RentalRequests
{
    public class RentalRequest : EntityAuditBase
    {
        public Guid RentalId { get; set; }
        public Guid UserId { get; set; }
        public string AddressRented { get; set; } = null!;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string StatusApprove { get; set; } = null!;
        public string Note { get; set; } = null!;
        public virtual Rental? Rental { get; set; }
    }
}
