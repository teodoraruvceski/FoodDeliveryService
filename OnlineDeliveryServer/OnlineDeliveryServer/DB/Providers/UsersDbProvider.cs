namespace OnlineDeliveryServer.DB.Providers
{
    public class UsersDbProvider
    {
        public bool AddUser(User user)
        {
            using (var db = new ProjectDBContext())
            {
                db.User.Add(user);
                db.SaveChanges();
            }
            return true;
        }
        public IEnumerable<User> RetrieveUsers()
        {
            List<User> users = new List<User>();
            using (var db = new ProjectDBContext())
            {
                var query = from u in db.User
                            select u;
                foreach (User u in query)
                    users.Add(u);
            }
            return users;
        }
       
        public List<User> GetAllDeliverers()
        {
            using(var db=new ProjectDBContext())
            {
                return db.User.Where(u => u.Role == UserRole.deliverer).ToList();
            }
        }
        public User Find(User user)
        {
            using(var db = new ProjectDBContext())
            {
                var q= from u in db.User
                       where u.Email == user.Email
                       select u;
                return (User)(q.ToArray()[0]);
            }
        }
        public User Find(int id)
        {
            using( var db = new ProjectDBContext())
            {
                User user=db.User.Find(id);
                user.Password = "";
                return user;
            }
        }
        public void ChangeProfile(User u)
        {
            User user = null;
            using (var db = new ProjectDBContext())
            {
                 user = db.User.Find(u.Id);
            }
            using (var db = new ProjectDBContext())
            {
               
                if (user != null)
                {
                    db.User.Update(u);
                    db.SaveChanges();
                }
            }
        }
           
    }
}
