using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Roles.RolerServiceInputDto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
	[Route("api/role")]
	[ApiController]
	public class RoleController : ControllerBase
	{
		private readonly ILogger<RoleController> _logger;
		private readonly IRoleService roleService;

		public RoleController(ILogger<RoleController> logger, IRoleService roleService)
		{
			_logger = logger;
			this.roleService = roleService;
		}

		[HttpGet("listrole")]
		public async Task<IActionResult> GetListAsync([FromQuery] GetListRoleInputDto inputDto)
		{
			var output = await roleService.GetListRoleAsync(inputDto);
			return Ok(output);
		}

		[HttpPost("addnewrole")]
		public async Task<IActionResult> CreateAsync([FromBody] AddNewRoleInputDto inputDto)
		{
			var output = await roleService.CreateAsync(inputDto);
			return Created(output.StatusCode, output);
		}

		[HttpPut("updatenewrole")]
		public async Task<IActionResult> UpdateAsync([FromBody] UpdateNewRoleInputDto inputDto)
		{
			var output = await roleService.UpdateRoleAsync(inputDto);
			return Ok(output);
		}

		[HttpPut("changerole")]
		public async Task<IActionResult> ChangeAsync([FromBody] ChangeRoleInputDto inputDto)
		{
			var output = await roleService.ChangeRoleAsync(inputDto);
			return Ok(output);
		}

		[HttpPut("activerole")]
		public async Task<IActionResult> ActiveAsync([FromBody] ActiveRoleInputDto inputDto)
		{
			var output = await roleService.ActiveRoleAsync(inputDto);
			return Ok(output);
		}
	}
}
