namespace BE.Application.Common.Results
{
    public class ResultService
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;
        public Object Datas { get; set; } = null!;
    }
}
