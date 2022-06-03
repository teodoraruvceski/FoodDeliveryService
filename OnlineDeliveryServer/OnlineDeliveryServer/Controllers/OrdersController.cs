using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineDeliveryServer.DTOs;
using OnlineDeliveryServer.Services;
using OnlineDeliveryServer.ServicesInterfaces;

namespace OnlineDeliveryServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : Controller
    {
        IOrdersService ordersService;
        public OrdersController(IOrdersService ordersService)
        {
            this.ordersService= ordersService;
        }
       

        // POST: OrdersController/Create
        [HttpPost]
        [Route("addOrder")]
        [Authorize(Roles = "guest")]
        public ActionResult AddOrder(OrderDto order)
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            order.Created=DateTime.Now;
            if(ordersService.AddOrder(order, token))
            {
                return Ok(order);
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("getAllOrders")]
        [Authorize(Roles = "admin")]
        public ActionResult GetAllORders(OrderDto o)
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            List<OrderDto> orders = ordersService.GetAllOrders(token).ToList<OrderDto>();
            if (orders != null)
            {
                return Ok(orders);
            }
            else return Ok(new List<Order>());
        }
        [HttpPost]
        [Route("getUsersOrders")]
        [Authorize(Roles = "guest")]
        public ActionResult GetUsersOrders(OrderDto o)
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            List<OrderDto> orders = ordersService.GetOrdersByUser(token).ToList<OrderDto>();
            if (orders != null)
            {
                return Ok(orders);
            }
            else return Ok(new List<Order>());
        }
        [HttpPost]
        [Route("getDeliverersOrders")]
        [Authorize(Roles = "deliverer")]
        public ActionResult GetDeiverersOrders(OrderDto o)
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            List<OrderDto> orders = ordersService.GetOrdersByDeliverer(token).ToList<OrderDto>();
            if (orders != null)
            {
                return Ok(orders);
            }
            else return Ok(new List<Order>());
        }
        [HttpGet]
        [Route("getNewOrders")]
        [Authorize(Roles = "deliverer")]
        public ActionResult GetNewOrders()
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            List<OrderDto> orders = ordersService.GetNewOrders(token).ToList<OrderDto>();
            if (orders != null)
            {
                return Ok(orders);
            }
            else return Ok(new List<Order>());
        }
        [HttpPost]
        [Route("startDelivery")]
        [Authorize(Roles = "deliverer")]
        public ActionResult StartDelivery(OrderDto o)
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            OrderDto order = ordersService.StartDelivery(o,token);
            
            return Ok(order);
            
        }
        [HttpGet]
        [Route("getActiveOrder")]
        public OrderDto GetActiveOrder()
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            return ordersService.GetActiveOrder(token);
        }
    }
}
