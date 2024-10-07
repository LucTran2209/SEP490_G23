namespace BE.Application.Models;

public class PagedResultModel<T> where T : class
{
    public IList<T> Items { get; set; } = new List<T>();

    public int PageSize { get; set; }

    public int PageIndex { get; set; }

    public int TotalCount { get; set; }
}