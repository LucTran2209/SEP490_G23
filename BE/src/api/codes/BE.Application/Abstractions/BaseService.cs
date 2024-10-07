using BE.Domain.Abstractions.UnitOfWork;

namespace BE.Application.Abstractions
{
    public abstract class BaseService
    {
        protected readonly IUnitOfWork unitOfWork;

        public BaseService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
    }
}
