using OnlineDeliveryServer.DTOs;
using OnlineDeliveryServer.Models;

namespace OnlineDeliveryServer.ServicesInterfaces
{
    public interface IAuthenticationService
    {
        bool RegisterUser(UserDto user);
        Token Login(User user);
    }
}
