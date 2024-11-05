using BE.Application.Services.Orders.OrderServiceInputDto;

public static class OrderExtention
{
    public static OrderStatus CreateOrderStatus(CreateOrderStatusInputDto inputDto, string file)
    {
        var os = new OrderStatus();
        os.Id = Guid.NewGuid();
        os.OrderId = inputDto.OrderId;
        os.Message = inputDto.Message;
        os.Status = inputDto.Status;
        os.FileAttach = file;
        return os;
    }
}