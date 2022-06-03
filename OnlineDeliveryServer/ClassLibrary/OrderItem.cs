using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary
{
    public class OrderItem
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public string Ingredients { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public OrderItem() { }

        public OrderItem(string name, int id, string ingredients, double price)
        {
            Name = name;
            Id = id;
            Ingredients = ingredients;
            Price = price;
        }
    }
}
