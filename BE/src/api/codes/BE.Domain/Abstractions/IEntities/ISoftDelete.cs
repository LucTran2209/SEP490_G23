﻿namespace BE.Domain.Abstractions.IEntities
{
    public interface ISoftDelete
    {
        public bool IsDeleted { get; set; }
    }
}
