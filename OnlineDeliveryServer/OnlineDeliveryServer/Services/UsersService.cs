using AutoMapper;
using OnlineDeliveryServer.DB.Providers;
using OnlineDeliveryServer.DTOs;
using OnlineDeliveryServer.ServicesInterfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace OnlineDeliveryServer.Services
{
    public class UsersService : IUsersService
    {
        private UsersDbProvider provider = new UsersDbProvider();
        private IMapper map;
        public UsersService(IMapper m)
        {
            map = m;
        }
        public UserDto GetAuthenticatedUser(string token)
        {
           if(token!=null && token!="")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                int id = int.Parse(result);
                User user= provider.Find(id);
                UserDto userDto = map.Map<UserDto>(user);
                userDto.Image= Encoding.Default.GetString(user.Image);
                return userDto;
            }
            return null;
        }
        public bool ChangeProfile(UserDto u, string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                int id = int.Parse(result);
                //User u2 = map.Map<User>(u);
                //
                User u2 = new User();
                u2.Address = u.Address;
                u2.Name = u.Name;
                u2.Lastname = u.Lastname;
                u2.Email = u.Email;
                u2.Username = u.Username;
                u2.Role = u.Role;
                u2.State = u.State;
                u2.Birthdate = u.Birthdate;
                ///
                u2.Image = Encoding.ASCII.GetBytes(u.Image);
             
                //
                u2.Image= Encoding.ASCII.GetBytes(u.Image);
                User user= provider.Find(id);
                if(user!=null)
                {
                    if (u.Name != "" && u.Lastname != "" && u.Username != "" && u.Address != ""
                        && u.Birthdate < DateTime.Now && u.Name.Length > 2 && u.Lastname.Length > 2
                            && u.Username.Length >2  && u.Email != "" && u.Email.Contains('@')
                            && u.Email.Contains('.') && u.Email.Length>4)
                    {
                        u2.Password = user.Password;
                        u2.Id = user.Id;
                        u2.Orders = user.Orders;
                        u2.State = user.State;
                        u2.Role = user.Role;
                        
                        provider.ChangeProfile(u2);
                        return true;
                    }
                }

            }
                return false;
        }

        public List<User> GetAllDeliverers(string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;

                if (result == UserRole.admin.ToString())
                {
                    return provider.GetAllDeliverers();
                }
            }
            return null;
        }

        public User ChangeUserState(User user, string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
                if(result== UserRole.admin.ToString())
                {
                    User u = provider.Find(user.Id);
                    if(u!=null)
                    {
                        u.State= user.State;
                        provider.ChangeProfile(u);
                        if(u.State==UserState.verified)
                        {
                            Email("Your account is verified!");
                        }
                        else if(u.State==UserState.declined)
                        {
                            Email("Your account is declined.");
                        }
                        return u;
                    }
                }
            }
            return null;
        }
        public static void Email(string htmlString)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("teodoraruvceski@gmail.com");
                message.To.Add(new MailAddress("teodoraruvceski@gmail.com"));
                message.Subject = "Test";
                message.IsBodyHtml = true; //to make message body as html  
                message.Body = htmlString;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("teodoraruvceski@gmail.com", "31031999");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            }
            catch (Exception) { }
        }
    }
}
