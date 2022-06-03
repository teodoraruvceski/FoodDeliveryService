export class OrderItem
{
    id: number = 0;
  name: String = '';
  ingredients: String = '';
  price: number = 0;
  quantity: number =0;
  public ToString(orderItem: OrderItem) {
    return (
      'ID: ' +
      orderItem.id +
      'Name: ' +
      orderItem.name +
      'Quantity: '+
      orderItem.quantity+
      'Price: ' +
      orderItem.price
    );
  }
}