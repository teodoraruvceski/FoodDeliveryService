namespace OnlineDeliveryServer.DTOs
{
    public class OrderItemDto
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public string Ingredients { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public OrderItemDto() { }

        public OrderItemDto(string name, int id, string ingredients, double price)
        {
            Name = name;
            Id = id;
            Ingredients = ingredients;
            Price = price;
        }
    }
}
