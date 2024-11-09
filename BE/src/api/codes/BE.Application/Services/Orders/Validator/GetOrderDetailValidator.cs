using BE.Application.Services.Orders.OrderServiceInputDto;
using BE.Persistence;

namespace BE.Application.Services.Orders.Validator
{
    public class GetOrderDetailValidator : ValidatorBase<GetOrderDetailInputDto>
    {
        public GetOrderDetailValidator(ApplicationDbContext context, IUser user) : base(context, user)
        {
            RuleFor(i => i.OrderId)
              .MustAsync(async (orderId, cancellation) =>
              {
                  return await context.Orders.AnyAsync(o => o.Id == orderId);

              }).WithMessage("Order does not exist in the database.");
        }
    }
}
