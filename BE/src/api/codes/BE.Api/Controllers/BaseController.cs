using BE.Application.Common.Results;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    public class BaseController : ControllerBase
    {
        protected IActionResult ReturnFollowStatusCode(ResultService resultService)
        {
            switch (resultService.StatusCode)
            {
                case 200:
                    return Ok(resultService);
                case 201:
                    return Created("201", resultService);
                case 404:
                    return NotFound(resultService);
                case 400:
                    return BadRequest(resultService);
                case 500:
                    return BadRequest(resultService);
                default:
                    return BadRequest(resultService);
            }
        }
    }
}
