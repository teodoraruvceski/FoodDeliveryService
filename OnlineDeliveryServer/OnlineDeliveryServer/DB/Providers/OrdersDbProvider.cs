using Microsoft.EntityFrameworkCore;

namespace OnlineDeliveryServer.DB.Providers
{
    public class OrdersDbProvider
    {
        public void AddOrder(Order order)
        {
            using(var db=new ProjectDBContext())
            {
                db.Add(order);
                db.SaveChanges();
            }
         
        }
        public Order GetActiveOrderDeliverer(int id)
        {
            using (var db = new ProjectDBContext())
            {
                var v =  from aa in db.Order
                                    where aa.DelivererId==id && aa.State==OrderState.in_progress
                                    select aa;
                if (v.ToList<Order>().Count>0)
                {
                    Order o = v.ToList<Order>()[0];
                    return o;
                }

                return null;
            }
        }
        public Order GetActiveOrderPurchaser(int id)
        {
            using (var db = new ProjectDBContext())
            {
                var v = from aa in db.Order
                        where aa.PurchaserId == id && aa.State == OrderState.in_progress
                        select aa;
                if (v.ToList<Order>().Count > 0)
                {
                    Order o = v.ToList<Order>()[0];
                    return o;
                }

                return null;

            }
        }
        public IEnumerable<Order> GetAllOrders()
        {
            List<Order> orders = new List<Order>();
            using (var db = new ProjectDBContext())
            {
                var v=db.Order.Include(o => o.Items).ToList();
                var query = from o in db.Order
                            select o;
                foreach (Order o in v)
                    orders.Add(o);
            }
            return orders;
        }
        public IEnumerable<Order> GetNewOrders()
        {
            List<Order> orders = new List<Order>();
            using (var db = new ProjectDBContext())
            {
                var v = db.Order.Where(o=>o.State==OrderState.created).Include(o => o.Items).ToList();
                var query = from o in db.Order
                            select o;
                foreach (Order o in v)
                    orders.Add(o);
            }
            return orders;
        }
        public IEnumerable<Order> GetOrdersByUser(int id)
        {
            List<Order> orders = new List<Order>();
            using (var db = new ProjectDBContext())
            {
                var query = db.Order.Where(o => o.PurchaserId == id).Include(o => o.Items).ToList();
                foreach (Order o in query)
                    orders.Add(o);
            }
            return orders;
        }
        public IEnumerable<Order> GetOrdersByDeliverer(int id)
        {
            List<Order> orders = new List<Order>();
            using (var db = new ProjectDBContext())
            {
                var query = db.Order.Where(o => o.DelivererId == id).Include(o => o.Items).ToList();
                foreach (Order o in query)
                    orders.Add(o);
            }
            return orders;
        }
        public void ChangeOrder(Order o)
        {
            Order order= null;
            using (var db = new ProjectDBContext())
            {
                order = db.Order.Find(o.Id);
            }
            using (var db = new ProjectDBContext())
            {

                if (order != null)
                {
                    db.Order.Update(o);
                    db.SaveChanges();
                }
            }
        }
        public Order Find(int id)
        {
            using(var db=new ProjectDBContext())
            {
                return db.Order.Find(id);
            }
        }
    }
}
