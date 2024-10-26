using BE.Application.Services.Orders.OrderOutputDto;
using BE.Application.Services.Orders.OrderServiceInputDto;
using BE.Domain.Entities;

public static class OrderExtention
{
    public static Order ToEntity(this CreateOrderInputDto inputDto)
    {
        var order = new Order();
        order.Address = inputDto.Address;
        order.UserId = inputDto.UserId;
        order.StartDate = inputDto.StartDate;
        order.EndDate = inputDto.EndDate;
        order.Note = inputDto.Note;
        return order;
    }

    public static OrderStatus CreateOrderStatus(CreateOrderStatusInputDto inputDto, string file)
    {
        var os = new OrderStatus();
        os.Id = Guid.NewGuid();
        os.OrderId = inputDto.OrderId;
        os.Message = inputDto.MessageStatus;
        os.Status = inputDto.Status;
        os.FileAttach = file;
        return os;
    }
    public static ListOrderByUserOutputDto ToOrderOutputDto(Order order)
    {
        var o = new ListOrderByUserOutputDto()
        {
            OrderId = order.Id,
            UserId = order.UserId,
            Address = order.Address,
            NumberofRentalDays = (order.EndDate - order.StartDate).Days,
            Note = order.Note,
            Status = order.OrderStatuses
                          .OrderByDescending(os => os.CreatedDate) // Sắp xếp theo CreatedDate giảm dần
                          .Select(os => os.Status.ToString())      // Lấy tên trạng thái
                          .FirstOrDefault() ?? "Order",
            RentalShopName = order.OrderDetails
                                    .Select(od => od.Product.RentalShop.ShopName)
                                    .FirstOrDefault(),
            DetailProducts = order.OrderDetails.Select(od => new DeatilOfProduct
            {
                ProductName = od.Product.ProductName,
                Quantity = od.Quantity,
                Price = od.Product.RentalPrice,
                DepositPrice = od.Product.DepositPrice,
                Images = od.Product.ProductImages?.Select(pi => pi.Link ?? string.Empty).ToList()
                     ?? new List<string>()
            }
            ).ToList()
        };
        o.TotalPrice = o.DetailProducts.Sum(dp => (double)(dp.Price * dp.Quantity));
        return o;
    }
}

