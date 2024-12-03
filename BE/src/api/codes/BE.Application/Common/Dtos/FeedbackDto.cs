using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Application.Common.Dtos
{
    public class FeedbackDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public decimal Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string? AvatarPersonal { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }
}
