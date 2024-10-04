namespace BE.Application.DependencyInjections
{
    public class JwtOption
    {
        public required string ValidAudience {  get; set; }
        public required string ValidIssuer {  get; set; }
        public required string Secret {  get; set; }
    }
}
