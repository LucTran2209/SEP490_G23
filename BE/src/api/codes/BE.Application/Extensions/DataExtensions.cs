using Microsoft.EntityFrameworkCore;
using BE.Application.Models;
using System.Linq.Expressions;
using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;

namespace BE.Application.Extensions;

public static class DataExtensions
{
	public static IQueryable<T> ToPageList<T>(this IQueryable<T> query, PagedResultRequestModel filter)
		where T : EntityAuditBase
	{
		int pageIndex = filter.PageIndex ?? 0;
		pageIndex = pageIndex <= 1 ? 0 : pageIndex - 1;

		int pageSize = filter.PageSize ?? 10;
		query = query.Skip(pageSize * pageIndex)
			.Take(pageSize);
		return query;
	}

	public static async Task<PagedResultModel<T>> ToPageResult<T>(this IQueryable<T> query, int count, PagedResultRequestModel filter)
		where T : class
	{
		return new PagedResultModel<T>
		{
			Items = await query.ToListAsync(),
			TotalCount = count,
			PageIndex = filter.PageIndex ?? 1,
			PageSize = filter.PageSize ?? 10,
		};
	}

	public static async Task<PagedResultModel<Y>> ToPageResult<T, Y>(
		this IQueryable<T> query,
		int count,
		PagedResultRequestModel filter,
		Expression<Func<T, Y>> mapping)
		where T : EntityAuditBase
        where Y : class
	{
		return new PagedResultModel<Y>
		{
			Items = await query.Select(mapping).ToListAsync(),
			TotalCount = count,
			PageIndex = filter.PageIndex ?? 1,
			PageSize = filter.PageSize ?? 10,
		};
	}

	public static IQueryable<T> Filter<T>(this IQueryable<T> query, string? filter, Expression<Func<T, bool>> predicate)
		where T : EntityAuditBase
    {
		if (string.IsNullOrWhiteSpace(filter))
		{
			return query;
		}
		return query.Where(predicate);
	}

	public static IQueryable<T> Filter<T>(this IQueryable<T> query, int? filter, Expression<Func<T, bool>> predicate)
		where T : EntityAuditBase
	{
		if (filter == null)
		{
			return query;
		}
		return query.Where(predicate);
	}
	public static IQueryable<T> Filter<T>(this IQueryable<T> query, long? filter, Expression<Func<T, bool>> predicate)
		where T : EntityAuditBase
    {
		if (filter == null)
		{
			return query;
		}
		return query.Where(predicate);
	}

	public static IQueryable<T> Filter<T>(this IQueryable<T> query, decimal? filter, Expression<Func<T, bool>> predicate)
		where T : EntityAuditBase
	{
		if (filter == null)
		{
			return query;
		}
		return query.Where(predicate);
	}

	public static async Task<T?> GetById<T, Tkey>(this IQueryable<T> query, Tkey id)
		where T : IEntityBase<Tkey>
	{
		return await query.FirstOrDefaultAsync(x => x.Id.ToString() == id.ToString());
	}
}
