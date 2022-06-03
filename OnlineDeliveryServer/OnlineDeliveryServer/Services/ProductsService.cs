using OnlineDeliveryServer.DB.Providers;
using OnlineDeliveryServer.ServicesInterfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace OnlineDeliveryServer.Services
{
    public class ProductsService : IProductsService
    {
        UsersDbProvider usersProvider=new UsersDbProvider();
        ProductsDbProvider provider = new ProductsDbProvider();
        public Product AddProduct(Product product, string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
                if(result==UserRole.admin.ToString())
                {
                    return provider.AddProduct(product);
                }
            }
            return null;
        }

        public List<Product> GetAllProducts(string token)
        {
            if (token != null && token != "")
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                string result = jwt.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
                int id = int.Parse(result);
                User user = usersProvider.Find(id);
                if(user!=null)
                {
                    return provider.GetAllProducts();
                }
            }
            return null;
        }
    }
}
