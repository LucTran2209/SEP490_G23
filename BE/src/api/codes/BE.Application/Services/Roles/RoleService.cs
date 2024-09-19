using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Roles.RolerServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging; // Import namespace này
using System.Net;

namespace BE.Application.Services.Roles
{
	public class RoleService : BaseService, IRoleService
	{
		private readonly IValidator<AddNewRoleInputDto> addNewRoleValidator;
		private readonly ILogger<RoleService> _logger;  // Khai báo biến _logger

		// Thêm ILogger vào constructor
		public RoleService(IUnitOfWork unitOfWork, IValidator<AddNewRoleInputDto> addNewRoleValidator, ILogger<RoleService> logger)
			: base(unitOfWork)
		{
			this.addNewRoleValidator = addNewRoleValidator;
			_logger = logger;  // Gán giá trị logger
		}

		public async Task<ResultService> ActiveRoleAsync(ActiveRoleInputDto inputDto)
		{
			throw new NotImplementedException();
		}

		public async Task<ResultService> ChangeRoleAsync(ChangeRoleInputDto inputDto)
		{
			var existingRole = await unitOfWork.RoleRepository.FindByIdAsync(inputDto.RoleId);
			if (existingRole == null)
			{
				return new ResultService
				{
					StatusCode = HttpStatusCode.NotFound.ToString(),
					Message = "Role not found"
				};
			}

			existingRole.RoleName = inputDto.RoleName;
			existingRole.Description = inputDto.Description;

			unitOfWork.RoleRepository.Update(existingRole);
			await unitOfWork.SaveChangesAsync();

			return new ResultService
			{
				StatusCode = HttpStatusCode.OK.ToString(),
				Message = "Role changed successfully"
			};
		}

		public async Task<ResultService> CreateAsync(AddNewRoleInputDto inputDto)
		{
			//try
			//{
				await addNewRoleValidator.ValidateAndThrowAsync(inputDto);

				// Chuyển DTO thành entity, bao gồm cả RoleName và Description
				var role = inputDto.ToEntity();
				role.Id = Guid.NewGuid();

				unitOfWork.RoleRepository.Insert(role);
				await unitOfWork.SaveChangesAsync();

				return new ResultService
				{
					StatusCode = HttpStatusCode.Created.ToString(),
					Message = "Role created successfully"
				};
			//}
			//catch (Exception ex)
			//{
			//	_logger.LogError(ex, "Error while creating role");

			//	return new ResultService
			//	{
			//		StatusCode = HttpStatusCode.InternalServerError.ToString(),
			//		Message = "An error occurred while saving the entity changes.",
			//		Datas = ex.InnerException?.Message ?? ex.Message
			//	};
			//}
		}

		public async Task<ResultService> GetListRoleAsync(GetListRoleInputDto inputDto)
		{
			//return new ResultService
			//{
			//	StatusCode = HttpStatusCode.OK.ToString(),
			//	Message = "Success",
			//};
			var roles = await unitOfWork.RoleRepository.GetAll().ToListAsync();

			if (roles == null || roles.Count == 0)
			{
				return new ResultService
				{
					StatusCode = HttpStatusCode.OK.ToString(),
					Message = "No roles found",
					Datas = null
				};
			}

			var result = roles.Select(role => role.ToDto()).ToList();  // Ánh xạ từ Entity sang DTO

			return new ResultService
			{
				StatusCode = HttpStatusCode.OK.ToString(),
				Message = "Success",
				Datas = result
			};
		}

		public async Task<ResultService> UpdateRoleAsync(UpdateNewRoleInputDto inputDto)
		{
			var existingRole = await unitOfWork.RoleRepository.FindByIdAsync(inputDto.RoleId);
			if (existingRole == null)
			{
				return new ResultService
				{
					StatusCode = HttpStatusCode.NotFound.ToString(),
					Message = "Role not found"
				};
			}

			existingRole.RoleName = inputDto.RoleName;
			existingRole.Description = inputDto.Description;

			unitOfWork.RoleRepository.Update(existingRole);
			await unitOfWork.SaveChangesAsync();

			return new ResultService
			{
				StatusCode = HttpStatusCode.OK.ToString(),
				Message = "Role updated successfully"
			};
		}
	}
}
