using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace BE.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService authenticationService;
        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost("loginbyusernamepassword")]
        public async Task<IActionResult> LoginByUserNamePassword(LoginByUserNamePasswordInputDto inputDto)
        {
            var result =  await authenticationService.LoginByUserNamePasswordAsync(inputDto);
            
            return Ok(result);
        }
    }
}
