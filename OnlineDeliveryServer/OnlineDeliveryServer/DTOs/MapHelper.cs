namespace OnlineDeliveryServer.DTOs
{
    public static class MapHelper
    {
        public static List<OrderDto> mapToDto(List<Order> orders)
        {
            List<OrderDto> result = new List<OrderDto>();
            foreach (Order order in orders)
            {
                OrderDto dto = new OrderDto();
                dto.Started = order.Started;
                dto.Ended= order.Ended;
                dto.Created=order.Created;
                dto.DeliveryAddress=order.DeliveryAddress;
                dto.Price=order.Price;
                dto.Comment=order.Comment;
                dto.State=order.State;
                dto.DeliveryTime=order.DeliveryTime;
                dto.Id=order.Id;
                dto.PurchaserId=order.PurchaserId;
                foreach(OrderItem item in order.Items)
                {
                    OrderItemDto dtoItem = new OrderItemDto();
                    dtoItem.Id=item.Id;
                    dtoItem.Quantity=item.Quantity;
                    dtoItem.Price=item.Price;
                    dtoItem.Ingredients=item.Ingredients;
                    dtoItem.Name=item.Name;
                    dto.Items.Add(dtoItem);
                }
                result.Add(dto);
            }
            return result;
        }
    }
}
