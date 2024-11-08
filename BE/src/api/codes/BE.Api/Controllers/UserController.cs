using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Users.UserServiceInputDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseController
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            this.userService = userService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> InsertAsync([FromForm] CreateUserInputDto inputDto)
        {
            var output = await userService.CreateAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }

        [HttpGet("listuser")]
        [Authorize]
        public async Task<IActionResult> GetListAsync([FromQuery] GetListUserInputDto inputDto)
        {
            var output = await userService.GetListUserAsync(inputDto);
            return Ok(output);
        }

        [HttpGet("viewprofile")]
        [Authorize]
        public async Task<IActionResult> GetUserByUserIdAsync([FromQuery] FindUserInputDto inputDto)
        {
            var output = await userService.GetUserByIdAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }

        [HttpPut("activeuser")]
        [Authorize]
        public async Task<IActionResult> AcitiveUser([FromBody] ActiveUserInputDto inputDto)
        {
            var output = await userService.ActiveUserAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }

        [HttpPut("updateprofile")]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromForm] UpadteUserInputDto inputDto)
        {
            var output = await userService.UpadteUserAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }
    }
}