using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Order.OrderServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using FluentValidation;
using System.Net;

namespace BE.Application.Services.Order
{
    public class OrderService : BaseService, IOrderService
    {
        private readonly IValidator<CreateOrderInputDto> createOrderValidator;

        public OrderService(IUnitOfWork unitOfWork, IUser user, IValidator<CreateOrderInputDto> createOrderValidator) : base(unitOfWork, user)
        {
            this.createOrderValidator = createOrderValidator;
        }

        public async Task<ResultService> CreateAsync(CreateOrderInputDto inputDto)
        {
            await createOrderValidator.ValidateAndThrowAsync(inputDto);

            var o = await unitOfWork.UserRepository.GetsUserByUserIDAsync(inputDto.UserId);

            if (o != null)
            {
                //kiểm tra và tạo bảng order
                var order = inputDto.ToEntity();
                order.Id = Guid.NewGuid();

                if (order.OrderDetails != null)
                {
                    //add bang order
                    await unitOfWork.OrderRepository.AddAsync(order);
                    var os = OrderExtention.CreateOrderStatus(inputDto, order.Id);
                    //add bang ordersattus
                    await unitOfWork.OrderStatusRepository.AddAsync(os);
                    //tạo biến để kiểm tra xem các sản phẩm có cùng 1 shop không
                    Guid RentailShopIdCheck = new Guid();

                    //add bang orderdetail theo bang order
                    foreach (var item in inputDto.DetailProducts)
                    {
                        //lấy id của shop theo product
                        var Product = await unitOfWork.ProductRepository.FindByIdAsync(item.ProductId);
                        //kiểm tra sản phẩm có cùng 1 shop không
                        if (RentailShopIdCheck != Product.RentalShopId)
                        {
                            //convert orderdetail
                            var ord = OrderExtention.CreateOrderDetail(order.Id, item);

                            // thực hiện add vào bảng orderdetail
                            await unitOfWork.OrderDeatilRepository.AddAsync(ord);

                            //gán lại giá trị của shopid
                            RentailShopIdCheck = Product.RentalShopId;
                        }
                        //trả về fail khi không cùng 1 shop
                        else
                        {
                            return new ResultService
                            {
                                StatusCode = HttpStatusCode.BadRequest.ToString(),
                                Message = "created fails.Products are not from the same store"
                            };
                        }
                    }
                    //thực hiện thành công
                    await unitOfWork.SaveChangesAsync();
                    return new ResultService
                    {
                        StatusCode = HttpStatusCode.Created.ToString(),
                        Message = "created successfully."
                    };
                }
                //trả về fail khi chưa có sản phẩm khi add
                return new ResultService
                {
                    StatusCode = HttpStatusCode.BadRequest.ToString(),
                    Message = "created fails. No products yet"
                };
            }
            // trả về fails khi không tồn tại user
            else
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.BadRequest.ToString(),
                    Message = "created fail. not found to user"
                };
            }

        }
    }
}
