using BE.Application.Abstractions;
using BE.Application.Services.Roles.RolerServiceInputDto;
using BE.Persistence;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Application.Services.Roles.Validators
{
	public class ActiveRoleValidator : ValidatorBase<ActiveRoleInputDto>
	{
		public ActiveRoleValidator(ApplicationDbContext context) : base(context)
		{
			RuleFor(r => r.RoleId)
				.NotEmpty().WithMessage("RoleId is required");

			RuleFor(r => r.IsActive)
				.NotNull().WithMessage("IsActive is required");
		}
	}
}
