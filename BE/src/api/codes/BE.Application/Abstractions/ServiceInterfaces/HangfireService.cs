

using Microsoft.AspNetCore.Components.Forms;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public class HangfireService : BaseService, IHangfireService
    {
        private readonly IMailService _mailService;

        public HangfireService(IUnitOfWork unitOfWork, IUser user, IMailService mailService


            ) : base(unitOfWork, user)
        {
            _mailService = mailService;
        }

        public async Task CheckOverDatePayment()
        {
            var orders = unitOfWork.OrderRepository.GetAll();

            foreach (var order in orders)
            {
                await CheckOverDatePayment(order.User!.Email!, order);
            }
        }

        public async Task CheckOverDatePayment(string email, Order order)
        {            
            order.OrderStatuses = order.OrderStatuses!.OrderByDescending(s => s.CreatedDate).ToList();

            var status = order.OrderStatuses.FirstOrDefault(x => x.Status == RequestStatus.PENDING_PAYMENT);

            if (status == null || order.OrderStatuses.Count > 2)
                return;

            // Nếu today == start date - 1  -> thông báo qua mail
            if (order.StartDate.Date >= DateTime.Now.Date)
            {
                string message = $"Đơn hàng {order.Code} ngày {order.CreatedDate.Date} chưa được thanh toán. Trong trường hợp quá ngày thanh toán sẽ hủy đơn hàng";

                await _mailService.SendMailAsync(null, email, "Thông báo thanh toán tiền đơn hàng", message);
            }
            // Nếu today > start date   ->  cancel order
            else
            {
                var orderStatus = new OrderStatus
                {
                    OrderId = order.Id,
                    Status = RequestStatus.CANCEL,
                };

                await unitOfWork.OrderStatusRepository.AddAsync(orderStatus);

                await unitOfWork.SaveChangesAsync();

                string message = $"Đơn hàng {order.Code} ngày {order.CreatedDate.Date} chưa được thanh toán. Đã tự động hủy";

                await _mailService.SendMailAsync(null, email, "Thông báo thanh toán tiền đơn hàng", message);
            }
        }



        public Task CheckOverDateRented(string email, Guid orderId)
        {
            throw new NotImplementedException();
        }
    }
}
