namespace BE.Application.Models;

public class PagedResultRequestModel
{
    public int? PageSize { get; set; }

    public int? PageIndex { get; set; }

    public string Search { get; set; } = string.Empty;

    public string? OrderBy { get; set; } = string.Empty;

    public bool OrderByDesc { get; set; } = true;

    public string? ThenBy { get; set; } = string.Empty;

    public bool ThenByDesc { get; set; } = false;
}
