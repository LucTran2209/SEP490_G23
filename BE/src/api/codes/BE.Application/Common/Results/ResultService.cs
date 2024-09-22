namespace BE.Application.Common.Results
{
    public class ResultService
    {
        public string StatusCode { get; set; } = "200";
        public string Message { get; set; } = string.Empty;
        public Object Datas { get; set; } = null!;
    }
}
