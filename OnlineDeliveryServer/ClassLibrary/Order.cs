using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary
{
    public class Order
    {
        public int Id { get; set; }
        public string DeliveryAddress { get; set; }
        public string Comment { get; set; }
        public double Price { get; set; }
        public OrderState State { get; set; }
        public DateTime Created { get; set; }
        public DateTime Started { get; set; }
        public DateTime Ended { get; set; }
        public ICollection<OrderItem> Items { get; set; }
        [ForeignKey("Deliverer")]
        public int DelivererId { get; set; }
        public User Deliverer { get; set; }
        [ForeignKey("Purchaser")]
        public int PurchaserId { get; set; }
        public User Purchaser { get; set; }
        public Order(int id, string deliveryAddress, string comment, double price)
        {
            Id = id;
            DeliveryAddress = deliveryAddress;
            Comment = comment;
            Price = price;
            this.Created=DateTime.Now;
            this.State = OrderState.CREATED;
        }
        public Order() { }
    }
}
