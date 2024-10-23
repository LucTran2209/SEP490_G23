using BE.Application.Services.Order.OrderServiceInputDto;
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
    public static OrderDetail CreateOrderDetail(Guid Id, DeatilProduct dp)
    {
        var od = new OrderDetail();
        od.Id = Guid.NewGuid();
        od.OrderId = Id;
        od.ProductId = dp.ProductId;
        od.Quantity = dp.Quantity;
        return od;
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
}

