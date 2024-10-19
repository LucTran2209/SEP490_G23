namespace BE.Application.DependencyInjections
{
    public class SmtpConfig
    {
        public string? SmtpServer { get; set; }
        public int Port { get; set; }
        public string? DisplayName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
