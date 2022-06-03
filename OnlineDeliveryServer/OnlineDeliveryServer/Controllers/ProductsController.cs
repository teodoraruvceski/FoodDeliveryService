using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineDeliveryServer.ServicesInterfaces;
using System.Collections.Generic;
namespace OnlineDeliveryServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : Controller
    {
        IProductsService productsService;
        public ProductsController(IProductsService ps)
        {
            productsService = ps;
        }
        [HttpGet]
        [Route("getAllProducts")]
        
        public ICollection<Product> GetAllProducts()
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            //t p2;
            ICollection<Product> products = productsService.GetAllProducts(token);
            //products.Add(new Product("Burito", 1, "Tortilla,chicken,nacho cheese", 5.0));
            //products.Add(new Product("Salad", 2, "Tortilla,chicken,nacho cheese", 6.0));
            //products.Add(new Product("Pizza", 3, "Tortilla,chicken,nacho cheese", 7.0));
            //products.Add(new Product("Tost", 4, "Tortilla,chicken,nacho cheese", 2.0));
            return products;
        }
        [HttpPost]
        [Route("addproduct")]
        [Authorize(Roles ="admin")]
        public ActionResult AddProduct(Product product)
        {
            string token = Request.Headers["Authorization"];
            token = token.Replace("Bearer ", "");
            return Ok(productsService.AddProduct(product, token));
            
        }

       
    }
}
