using AutoMapper;
using OnlineDeliveryServer.DB.Providers;
using OnlineDeliveryServer.DTOs;
using OnlineDeliveryServer.ServicesInterfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace OnlineDeliveryServer.Services
{
    public class OrdersService : IOrdersService
    {
        IMapper map;
        private readonly OrdersDbProvider ordersDbProvider=new OrdersDbProvider();
        private readonly UsersDbProvider usersDbProvider = new UsersDbProvider();

        public OrdersService(IMapper mapper)
        {
            map = mapper;
        }
        public bool AddOrder(OrderDto order,string token)
        {
            if(token!= null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                int id = int.Parse(result);

                if (order.DeliveryAddress != "" &&
                order.Items.Count != 0 &&
                order.Price != 0)
                {
                    Order o = map.Map<Order>(order);
                    o.PurchaserId = id;
                    o.DelivererId = -1;

                    ordersDbProvider.AddOrder(o);
                    return true;
                }
            }
            
            
            return false;
            
        }
        public IEnumerable<OrderDto> GetOrdersByUser(string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                int id = int.Parse(result);

                User user = usersDbProvider.Find(id);
                user.Orders = ordersDbProvider.GetOrdersByUser(id).ToList();
                return MapHelper.mapToDto(user.Orders.ToList<Order>());
            }
            return null;
        }
        public IEnumerable<OrderDto> GetAllOrders(string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
                //int id = int.Parse(result);
                if(result == UserRole.admin.ToString())
                {
                    return MapHelper.mapToDto(ordersDbProvider.GetAllOrders().ToList<Order>());
                }

               
            }
            return null;
        }
        public IEnumerable<OrderDto> GetNewOrders(string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
                //int id = int.Parse(result);
                if (result == UserRole.deliverer.ToString())
                {
                    return MapHelper.mapToDto(ordersDbProvider.GetNewOrders().ToList<Order>());
                }


            }
            return null;
        }
        public OrderDto GetActiveOrder(string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
                string result2 = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                int id = int.Parse(result2);
                if (result == UserRole.deliverer.ToString())
                {
                    Order order = ordersDbProvider.GetActiveOrderDeliverer(id);
                   return  map.Map<OrderDto>(order);
                }
                else if(result==UserRole.guest.ToString())
                {
                    Order order = ordersDbProvider.GetActiveOrderPurchaser(id);
                   return map.Map<OrderDto>(order);
                }    


            }
            return null;
        }

        public IEnumerable<OrderDto> GetOrdersByDeliverer(string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                int id = int.Parse(result);

                User user = usersDbProvider.Find(id);
                user.Orders = ordersDbProvider.GetOrdersByUser(id).ToList();
                return MapHelper.mapToDto(user.Orders.ToList<Order>());
            }
            return null;
        }

        public OrderDto StartDelivery(OrderDto order, string token)
        {
            Random r = new Random();
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                string result2 = jwt.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
                int id = int.Parse(result);
                if (result2 == UserRole.deliverer.ToString())
                {
                    Order o=ordersDbProvider.Find(order.Id);
                    o.State = OrderState.in_progress;
                    o.DelivererId = id;
                    o.DeliveryTime = r.Next(5,10);
                    o.Started=DateTime.Now;
                    Task.Run(() =>
                    {
                        Thread.Sleep((int)o.DeliveryTime*1000*60);
                        o.State = OrderState.completed;
                        ordersDbProvider.ChangeOrder(o);
                    });
                    ordersDbProvider.ChangeOrder(o);
                    return order;
                }

               
            }
            return null;
        }
    }
}
