using BE.Application.Services.Orders.OrderServiceInputDto;
using BE.Persistence;

namespace BE.Application.Services.Orders.Validator
{
    public class CreateOrderStatusValidator : ValidatorBase<CreateOrderStatusInputDto>
    {
        public CreateOrderStatusValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {

        }
    }
}
