using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Interfaces;

namespace BE.Application.Abstractions
{
    public abstract class BaseService
    {
        protected readonly IUnitOfWork unitOfWork;
        protected readonly IUser user;

        public BaseService(IUnitOfWork unitOfWork, IUser user)
        {
            this.unitOfWork = unitOfWork;
            this.user = user;
        }
    }
}
