using OnlineDeliveryServer.DTOs;

namespace OnlineDeliveryServer.ServicesInterfaces
{
    public interface IUsersService
    {
        UserDto GetAuthenticatedUser(string token);
        List<User> GetAllDeliverers(string token);
         bool ChangeProfile(UserDto u, string token);
        User ChangeUserState(User user, string token);
    }
}
