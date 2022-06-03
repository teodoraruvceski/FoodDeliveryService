using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using OnlineDeliveryServer.DB.Providers;
using OnlineDeliveryServer.DTOs;
using OnlineDeliveryServer.Models;
using OnlineDeliveryServer.ServicesInterfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace OnlineDeliveryServer.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private static UsersDbProvider provider;
        private readonly IConfigurationSection secretKey;
        IMapper map;
        public AuthenticationService(Microsoft.Extensions.Configuration.IConfiguration config,IMapper m)
        {
            map = m;
            secretKey= config.GetSection("SecretKey");
            provider = new UsersDbProvider();
        }
        public Token Login(User user)
        {
            User userFound= provider.Find(user);
            Token token = new Token();
            if(userFound!=null)
            {
                List<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.AuthorizationDecision, userFound.State.ToString()));
                claims.Add(new Claim(ClaimTypes.Role, userFound.Role.ToString()));
                claims.Add(new Claim(ClaimTypes.NameIdentifier, userFound.Id.ToString()));
                SymmetricSecurityKey symetricalSecretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey.Value));
                var signinCredentials = new SigningCredentials(symetricalSecretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:7119", 
                    claims: claims, 
                    expires: DateTime.Now.AddMinutes(60), 
                    signingCredentials: signinCredentials 
                );
                token.tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return token;
            }
            return null;
        }

        public bool RegisterUser(UserDto user)
        {
            //User u = map.Map<User>(user);
            User u = new User();
            u.Address = user.Address;
            u.Name = user.Name;
            u.Lastname = user.Lastname;
            u.Email=user.Email;
            u.Username = user.Username;
            u.Role = user.Role;
            u.State = user.State;
            u.Password = user.Password;
            u.Birthdate = user.Birthdate;
            ///
            u.Image= Encoding.ASCII.GetBytes(user.Image);
            user.Password = Encode(user.Password);
            u.Password = user.Password;
            return provider.AddUser(u);
        }
        private string Encode(string s)
        {
            using (var sha = SHA256.Create())
            {
                var computedHash = sha.ComputeHash(
                Encoding.Unicode.GetBytes(s + "!@#$%^&*()"));
                return Convert.ToBase64String(computedHash);
            }

        }
    }
}
