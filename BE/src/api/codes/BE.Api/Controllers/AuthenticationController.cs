using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("Login")]
        public async Task<IActionResult> LoginByUserNamePassword([FromBody] LoginByUserNamePasswordInputDto inputDto)
        {
            var result = await authenticationService.LoginByUserNamePasswordAsync(inputDto);

            return Ok(result);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterInputDto inputDto)
        {
            var result = await authenticationService.RegisterAsync(inputDto);

            return Ok(result);
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordInputDto inputDto)
        {
            var result = await authenticationService.ChangePasswordAsync(inputDto);

            return Ok(result);
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordInputDto inputDto)
        {
            var result = await authenticationService.ForgotPasswordAsync(inputDto);

            return Ok(result);
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordInputDto inputDto)
        {
            var result = await authenticationService.ResetPassword(inputDto);

            return Ok(result);
        }

        [HttpPost("VerifyEmail")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailInputDto inputDto)
        {
            var result = await authenticationService.VerifyEmailAsync(inputDto);
            return Ok(result);
        }

        [HttpPost("ComfirmVerifyEmailAsync")]
        public async Task<IActionResult> ComfirmVerifyEmailAsync([FromBody] ComfirmVerifyEmailInputDto inputDto)
        {
            var result = await authenticationService.ComfirmVerifyEmailAsync(inputDto);
            return Ok(result);
        }

        [HttpPost("check-not-existed-email")]
        public async Task<IActionResult> CheckNotExistedEmail([FromBody] CheckNotExistedEmailInputDto inputDto)
        {
            var result = await authenticationService.CheckNotExistedEmailAsync(inputDto);
            return Ok(result);
        }
    }
}