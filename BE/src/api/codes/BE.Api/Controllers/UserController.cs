using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Users.UserServiceInputDto;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            this.userService = userService;
        }

        //[HttpGet("GetAll")]
        //public async Task<IActionResult> GetAll([FromQuery] UserPageListRequest request)
        //{
        //    var res = await userService.Send(request);
        //    return Ok(res);
        //}

        [HttpPost]
        public async Task<IActionResult> InsertAsync([FromBody] CreateUserInputDto inputDto)
        {
            var output = await userService.CreateAsync(inputDto);
            return Created(output.StatusCode, output);
        }

        [HttpGet]
        public async Task<IActionResult> GetListAsync([FromQuery] GetListUserInputDto inputDto)
        {
            var output = await userService.GetListUserAsync(inputDto);
            return Ok(output);
        }
    }
}
