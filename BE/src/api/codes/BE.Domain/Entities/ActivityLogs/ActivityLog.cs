using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;

namespace BE.Domain.Entities.ActivityLogs
{
    public class ActivityLog : EntityAuditBase, IEntityBase<Guid>
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string IpAddress { get; set; } = null!;
        public string ServiceName { get; set; } = null!;
        public string MethodName { get; set; } = null!;
        public string LoggingType { get; set; } = null!;
        public string Message {  get; set; } = null!;
    }
}
