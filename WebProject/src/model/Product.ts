export class Product
{
    id: number = 0;
  name: string = '';
  ingredients: string = '';
  price: number = 0;

  public ToString(product: Product) {
    return (
      'ID: ' +
      product.id +
      ' Name: ' +
      product.name +
      ' Price: ' +
      product.price
    );
  }
}