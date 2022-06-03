using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineDeliveryServer.DTOs;
using OnlineDeliveryServer.Models;
using OnlineDeliveryServer.ServicesInterfaces;

namespace OnlineDeliveryServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        IAuthenticationService authService;
        public AuthenticationController(IAuthenticationService authService)
        {
            this.authService = authService;
        }
        [HttpPost]
        [Route("registration")]
        public ActionResult Registration(UserDto user)
        {
            if(authService.RegisterUser(user))
                return Ok(user);
            return BadRequest();
        }
        [HttpPost]
        [Route("login")]
        public ActionResult Login(User user)
        {
            Token token= authService.Login(user);
            if(token!=null)
            {
                return Ok(token);
            }
            return Ok("User doesn't exists.");
        }
       
    }
}
