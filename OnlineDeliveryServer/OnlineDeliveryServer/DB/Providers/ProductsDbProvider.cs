namespace OnlineDeliveryServer.DB.Providers
{
    public class ProductsDbProvider
    {
        public Product AddProduct(Product product)
        {
            using(var db=new ProjectDBContext())
            {
                Product v = (db.Product.Where(p => p.Name == product.Name)).FirstOrDefault();
                if (v != null)
                    return null;
                db.Add(product);
                db.SaveChanges();
            }
            using(var db=new ProjectDBContext())
            {
                var v=db.Product.Where(p => p.Name == product.Name);
                Product p =v.FirstOrDefault();
                return p;
            }
            return null;
        }
        public List<Product> GetAllProducts()
        {
            using (var db = new ProjectDBContext())
            {
                return db.Product.ToList();
            }
        }
    }
}
