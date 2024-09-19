using BE.Application.Abstractions;
using BE.Application.Services.Roles.RolerServiceInputDto;
using BE.Persistence;
using FluentValidation;

namespace BE.Application.Services.Roles.Validators
{
	public class AddNewRoleValidator : ValidatorBase<AddNewRoleInputDto>
	{
		public AddNewRoleValidator(ApplicationDbContext context) : base(context)
		{
			RuleFor(r => r.RoleName)
				.NotEmpty().WithMessage("RoleName is required")
				.MaximumLength(100).WithMessage("Max length 100 characters");

			RuleFor(r => r.Description)
				.MaximumLength(256).WithMessage("Max length 256 characters (optional)");
		}
	}
}
