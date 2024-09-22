using BE.Domain.Abstractions.IEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Domain.Abstractions
{
    public abstract class EntityAuditBase : IUserTracking<Guid>, IDateTracking, ISoftDelete
    {
        public Guid CreatedBy { get ; set ; }
        public string? CreatedByName { get ; set ; }
        public Guid ModifiedBy { get ; set ; }
        public string? ModifiedByName { get ; set ; }
        public DateTimeOffset CreatedDate { get ; set ; }
        public DateTimeOffset? LastModifiedDate { get ; set ; }
        public bool IsDeleted { get ; set ; }
    }
}
