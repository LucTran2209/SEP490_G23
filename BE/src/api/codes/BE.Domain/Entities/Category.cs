using BE.Domain.Abstractions;

namespace BE.Domain.Entities
{
    public class Category : EntityAuditBase
    {
        public string CategoryName { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}