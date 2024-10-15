using AutoMapper;
using BE.Domain.Entities;

namespace BE.Application.Services.Authentication.AuthenServiceInputDto
{
    public class RegisterInputDto
    {
        public required string FirstName {  get; set; }
        public required string LastName {  get; set; }
        public required string Email {  get; set; }
        public required string UserName {  get; set; }
        public required string Password {  get; set; }

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
