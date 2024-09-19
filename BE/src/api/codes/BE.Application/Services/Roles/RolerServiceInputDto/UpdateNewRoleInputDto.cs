namespace BE.Application.Services.Roles.RolerServiceInputDto
{
	public class UpdateNewRoleInputDto
	{
		public Guid RoleId { get; set; } 
		public string RoleName { get; set; } 
		public string Description { get; set; } 
	}
}
