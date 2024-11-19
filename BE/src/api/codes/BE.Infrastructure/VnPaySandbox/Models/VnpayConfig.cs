﻿namespace BE.Infrastructure.VnPaySandbox.Models
{
    public class VnpayConfig
    {
        public required string TmnCode { get; set; }
        public required string HashSecret { get; set; }
        public required string BaseUrl { get; set; }
        public required string Command { get; set; }
        public required string CurrCode { get; set; }
        public required string Version { get; set; }
        public required string Locale { get; set; }
        public required string ReturnUrl { get; set; }
        public required string TimeZoneId { get; set; }
    }
}
