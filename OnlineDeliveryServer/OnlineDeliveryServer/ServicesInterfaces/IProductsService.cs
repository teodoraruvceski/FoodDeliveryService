namespace OnlineDeliveryServer.ServicesInterfaces
{
    public interface IProductsService
    {
        Product AddProduct(Product product,string token);
        List<Product> GetAllProducts( string token);
    }
}
