namespace BE.Application.Services.Authentication.AuthenServiceInputDto
{
    public class RegisterInputDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<RegisterInputDto, User>()
                    .ForMember(dest => dest.FullName, src => src.MapFrom(src => $"{src.FirstName} {src.LastName}"));
            }
        }
    }
}