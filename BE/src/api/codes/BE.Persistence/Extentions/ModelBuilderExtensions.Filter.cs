using BE.Domain.Abstractions.IEntities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace BE.Persistence.Extensions;

public static partial class ModelBuilderExtensions
{
    static readonly MethodInfo IsDeletedFilterMethod = typeof(ModelBuilderExtensions)
        .GetMethods(BindingFlags.Public | BindingFlags.Static)
        .Single(t => t.IsGenericMethod && t.Name == nameof(IsDeletedFilter));

    public static void IsDeletedFilter(this ModelBuilder modelBuilder)
    {
        foreach (var type in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ISoftDelete).IsAssignableFrom(type.ClrType))
            {
                IsDeletedFilterMethod
                    .MakeGenericMethod(type.ClrType)
                    .Invoke(null, new object[] { modelBuilder });
            }
        }
    }

    public static void IsDeletedFilter<TEntity>(this ModelBuilder modelBuilder)
        where TEntity : class, ISoftDelete
    {
        modelBuilder.Entity<TEntity>().HasQueryFilter(x => !x.IsDeleted);
    }
}
