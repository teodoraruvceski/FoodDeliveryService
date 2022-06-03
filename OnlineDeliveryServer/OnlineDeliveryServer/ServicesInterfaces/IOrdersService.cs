using OnlineDeliveryServer.DTOs;

namespace OnlineDeliveryServer.ServicesInterfaces
{
    public interface IOrdersService
    {
        bool AddOrder(OrderDto order,string token);
         IEnumerable<OrderDto> GetAllOrders(string token);
         IEnumerable<OrderDto> GetOrdersByUser(string token);
         IEnumerable<OrderDto> GetOrdersByDeliverer(string token);
         IEnumerable<OrderDto> GetNewOrders(string token);
         OrderDto StartDelivery(OrderDto order,string token);
         OrderDto GetActiveOrder(string token);
    }
}
