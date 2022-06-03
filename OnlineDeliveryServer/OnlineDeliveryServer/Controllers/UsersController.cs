using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineDeliveryServer.DTOs;
using OnlineDeliveryServer.Models;
using OnlineDeliveryServer.Services;
using OnlineDeliveryServer.ServicesInterfaces;

namespace OnlineDeliveryServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private  readonly IUsersService usersService;
        // GET: UsersController
       public UsersController(IUsersService us)
        { usersService = us;}

        [HttpPost]
        [Route("getAuthenticatedUser")]
        public ActionResult GetAuthenticatedUser(Token token)
        {
           string  t = token.tokenString.Replace("Bearer ", "");
            UserDto user=usersService.GetAuthenticatedUser(t);
            return Ok(user);
        }
        [HttpPost]
        [Route("changeProfile")]
        public ActionResult ChangeProfile(UserDto user)
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            if (usersService.ChangeProfile(user, token))
            {
                return Ok(user);
            }
            return BadRequest();
            
        }

      [HttpGet]
      [Route("getalldeliverers")]
        [Authorize(Roles = "admin")]
        public List<User> GetAllDeliverers()
      {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            return usersService.GetAllDeliverers(token);
      }
        [HttpPost]
        [Route("changeuserstate")]
        [Authorize(Roles = "admin")]
        public ActionResult ChangeUserState(User user)
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            User u=usersService.ChangeUserState(user, token);
            return Ok(u);
        }
    }
}
