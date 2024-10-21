using BE.Application.Services.Order.OrderServiceInputDto;
using FluentValidation;

namespace BE.Application.Services.Order.Validator
{
    public class CreateOrderValidattor : AbstractValidator<CreateOrderInputDto>
    {
        public CreateOrderValidattor()
        {

        }
    }
}
